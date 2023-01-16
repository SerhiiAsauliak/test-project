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

export const ArticleItems = () => {
  const dispatch = useAppDispatch();
  const { articles, status } = useAppSelector(selectArticleData);
  const searchValue = useAppSelector(selectSearchValue)

  const getItems = () => {
    try {
      filterArticles()
      // dispatch(fetchArticles(searchValue))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
    
  }, [searchValue]);

  const skeleton = [...new Array(6)].map((_, index) => <SkeletonArticle key={index}/>);
  const content = articles.map((item: JSX.IntrinsicAttributes & { id: any; imageUrl: any; publishedAt: any; title: any; summary: any; }) => {
    return <SingleItem key={item.id} {...item} />;
  })
 
  //------------------------------------------
  const mapWithMatches = new Map()
  const {request} = useHttp()

  const filterArticles = async () => {
    const splitSearchValue = searchValue.split(' ')
    
    const fetchSearchItems = async() => {
      for (const item of splitSearchValue) {
        let data = await request(`${BASE_URL}?search=${item}`)
        
        data.map((el: { id: any; }) => {
          if(!mapWithMatches.has(el.id)) {
            mapWithMatches.set(el.id, {content: el, matches: 1})
          } else {
            mapWithMatches.get(el.id).matches++
          }
          return mapWithMatches
        })
        
      }
      const sortedMap = new Map([...mapWithMatches].sort((a, b) => b[1].matches - a[1].matches))
      const finalArr: any[] = []
      sortedMap.forEach(el => {
        finalArr.push(el.content)
      })
      dispatch(setArticles(finalArr))           
    }
    const matchData = await fetchSearchItems()
  }

  //starlink satellites
  // nasa talks Mars Warming 

  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
      {status === Status.LOADING ?  skeleton : content}
    </Grid>
  );
};
