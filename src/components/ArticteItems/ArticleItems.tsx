/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import SingleItem from "../SingleItem/SingleItem";
import { useEffect } from "react";
import {fetchArticles} from '../../store/articles/asyncActions'
import { selectArticleData } from "../../store/articles/articleSelector";
import { selectSearchValue } from "../../store/filters/filterSelector";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import SkeletonArticle from "../SkeletonArticle";
import { Status } from "../../@types/articles";
import data from '../../data.json'
import { useHttp } from './../../hooks/useHttp';
import { BASE_URL } from "../../config";
import { setArticles } from "../../store/articles/slice";
import HashTable from "../../utils/hashTable";
import { count } from "console";

export const ArticleItems = () => {
  const dispatch = useAppDispatch();
  const { articles, status } = useAppSelector(selectArticleData);
  const searchValue = useAppSelector(selectSearchValue)

  const getItems = () => {
    try {
      dispatch(fetchArticles(searchValue))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
    filterArticles()
  }, [searchValue]);

  const skeleton = [...new Array(6)].map((_, index) => <SkeletonArticle key={index}/>);
  const content = articles.map((item) => {
    return <SingleItem key={item.id} {...item} />;
  })
 
  const articlesFromDB = data.map((item) => {
    return <SingleItem key={item.id} {...item} />;
  })
//---------------------------------------------
  const hashTable = new HashTable();
  const mapWithMatches = new Map()
  const mapWithCount = new Map()
  let count = 1
  const {request} = useHttp()

  const filterArticles = async () => {
    const splitSearchValue = searchValue.split(' ')
    
    const fetchSearchItems = async() => {
      const matches = [];
      for (const item of splitSearchValue) {
        let data = await request(`${BASE_URL}?search=${item}`)
        matches.push(data);
        
      }
      // console.log(matches.flat())
      console.log(matches)
      matches.flat().map(el => {
        if(!mapWithMatches.has(el.id)) {
          mapWithMatches.set(el.id, el)
        }
        if(mapWithCount.has(el.id)) {
          count++
          mapWithCount.set(el.id, count)
        } else {
          mapWithCount.set(el.id, 1)
        }
        return mapWithMatches 
      })
      console.log(mapWithMatches)
      console.log(mapWithCount)
      return {mapWithMatches, mapWithCount}
    }

    const matchData = await fetchSearchItems()
    // matchData.map(el => {
    //   return el.map((item: { id: any; }) => mapWithMatches.set(item.id, item)
    //   )
    // })
  }

  // nasa Starlink effects
  // nasa talks Mars Warming 

  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
      {status === Status.LOADING ?  skeleton : content}
    </Grid>
  );
};
