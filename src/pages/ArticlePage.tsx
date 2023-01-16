import { Link, useParams } from 'react-router-dom';
import {useEffect} from 'react'
import arrowLeft from '../assets/arrow-left.svg'
import {fetchArticleItem} from '../store/articles/asyncActions'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { selectArticleItem } from '../store/articles/articleSelector';

export const ArticlePage = () => {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  // const articleItem = useAppSelector(state => state.articles.articleItem)
  const articleItem = useAppSelector(selectArticleItem)
  
  const getArticle  = async () => {
    try {
      if(id) {
        dispatch(fetchArticleItem(id))
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      getArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if(!articleItem) {
      return <h3>Loading...</h3>
    }

    const {title, summary, imageUrl} = articleItem
    
  return (
    <>
      <Box 
          sx={{
            width: '100%',
            height: '245px',
            background: `url(${imageUrl}) center/cover no-repeat fixed padding-box content-box`,
            zIndex: '0',  
            position: 'fixed',
            top: '0',
            left: '0'
          }}>
      </Box>
      <Box sx={{position: 'absolute', top: '150px', zIndex: '10'}}>
        <Box className='container' sx={{
            background: '#fff',
            border: '1px solid #EAEAEA',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
            borderRadius: '5px',
            marginBottom: '50px',
            padding: '0 75px'
          }}>
            <Typography variant="h4"
            component="h3" sx={{
                textAlign: 'center', 
                margin: '35px 0 50px 0',
                padding: '0 90px',
                fontSize: 24,
                }}>
              {title}
            </Typography>
            <Typography sx={{ marginBottom: '50px', color: '#000'}}>
              {summary}
            </Typography>
        </Box>
        <Box sx={{marginTop: '35px'}}>
          <img src={arrowLeft} alt="arrowLeft" style={{marginRight: '8px'}}/>
          <Link to='/'>Back to homepage</Link> 
        </Box>
      </Box>
    </>
  );
};

