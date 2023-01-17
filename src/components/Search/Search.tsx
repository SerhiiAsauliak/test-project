import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import searchIcon from "../../assets/search-vector.svg";
import { setSearchValue } from "../../store/filters/slice";
import { selectArticleData } from "../../store/articles/articleSelector";

import { Box, Divider, Input, Typography } from "@mui/material";

export const Search = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { articles } = useAppSelector(selectArticleData);

  const dispatch = useAppDispatch();

  const debounce = () => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(setSearchValue(e.target.value.split(' ')));
      }, 500);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Box
      sx={{
        marginTop: "50px",
        position: "relative",
      }}
    >
      <Typography
        sx={{ fontWeight: "var(--fw-bold)"}}
        variant="h6"
        component="h4"
      >
        Filter by keywords
      </Typography>
      <img
        style={{
          position: "absolute",
          top: "44px",
          left: "20px",
          width: "20px",
          height: "20px",
        }}
        src={searchIcon}
        alt="searchIcon"
      />
      <Input
        disableUnderline={true}
        name="search"
        sx={{
          marginBottom: "50px",
          width: "600px",
          height: "50px",
          borderRadius: "10px",
          padding: "8px 40px 8px 60px",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          fontWeight: "var(--fw-normal)",
          fontSize: "16px",
          color: "var(--text-color-input)",
          transition: "all 0.2s ease-in-out",
        }}
        onChange={optimizedDebounce}
        value={localSearch}
      />
      <Typography
        sx={{ fontWeight: "var(--fw-bold)" }}
        variant="h6"
        component="h4"
      >
        Results: {articles.length}
      </Typography>
      <Divider sx={{ border: "1px solid #EAEAEA", marginBottom: "60px" }} />
    </Box>
  );
};
