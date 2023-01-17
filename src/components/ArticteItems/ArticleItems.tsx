/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import SingleItem from "../SingleItem/SingleItem";
import { useEffect } from "react";
import { selectArticleData } from "../../store/articles/articleSelector";
import { selectSearchValue } from "../../store/filters/filterSelector";
import { useAppSelector } from "../../store/redux-hooks";
import SkeletonArticle from "../SkeletonArticle/SkeletonArticle";
import { Status } from "../../@types/articles";
import {useCleverSearch} from '../../hooks/useCleverSearch'

export const ArticleItems = () => {
  const { articles, status } = useAppSelector(selectArticleData);
  const searchValue = useAppSelector(selectSearchValue)
  console.log(searchValue);
  const {sortFetchedArticles} = useCleverSearch()

  const getItems = () => {
    try {
      sortFetchedArticles(searchValue)
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
 
  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
      {status === Status.LOADING ?  skeleton : content}
    </Grid>
  );
};
