import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Highlighter from "react-highlight-words";
import folderImage from "../../assets/folder-vector.svg";
import arrowImage from "../../assets/arrow-right.svg";

import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../store/redux-hooks";

const SingleItem = ({ id, imageUrl, publishedAt, title, summary }) => {
  
  let date = moment(publishedAt);
  date = date.format("MMM Do, YYYY");

  const sliceStr = (str) => {
    if (str && str.length > 100) {
      str = str.slice(0, 100) + "...";
      return str;
    }
    return str;
  };

  const { searchValue } = useAppSelector((state) => state.filter);

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          maxWidth: 400,
          height: 575,
          border: "1px solid#EAEAEA",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          sx={{ height: 217 }}
          image={imageUrl}
          title="article image"
          alt="article image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="h3"
            sx={{ margin: "25px 0" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flexStart",
                alignItems: "center",
              }}
            >
              <img src={folderImage} alt="folderImage" />
              <Box
                sx={{
                  marginLeft: "5px",
                  fontWeight: "var(--fw-normal)",
                  fontSize: "var(--fs-sm)",
                  color: "var(--text-color-main)",
                  opacity: "0.6",
                }}
              >
                {date}
              </Box>
            </Box>
          </Typography>
          <Typography
            gutterBottom
            variant="h4"
            component="h3"
            sx={{
              marginBottom: "25px",
              fontSize: 24,
            }}
          >
            <Highlighter
              searchWords={searchValue}
              autoEscape={true}
              textToHighlight={title}
            />
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 95, fontSize: 16, overflow: "hidden" }}
          >
            <Highlighter
              searchWords={searchValue}
              autoEscape={true}
              textToHighlight={sliceStr(summary)}
            />
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "10px 0 20px 16px" }}>
          <Link to={`/articles/${id}`}>Read more</Link>
          <img
            style={{ marginLeft: "8px" }}
            src={arrowImage}
            alt="arrowImage"
          />
        </CardActions>
      </Card>
    </Grid>
  );
};
export default SingleItem;
