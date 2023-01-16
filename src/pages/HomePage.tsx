import { ArticleItems } from '../components/ArticteItems/ArticleItems';
import { Search } from '../components/Search/Search';
import React from 'react';
import Box from '@mui/material/Box';

export const HomePage: React.FC = () => {
  
  return (
    <Box>
      <Search/>
      <ArticleItems/>
    </Box>
  );
};
