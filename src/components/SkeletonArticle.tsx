import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

export const SkeletonArticle = () => {
  return (
    <Box
      sx={{
        width: "400px",
        height: "530px",
        margin: "0 37px 15px 0",
        transform: "translateX(20px)",
      }}
    >
      <Skeleton sx={{margin: '-20px 0 5px 0', width: 400, height: 290 }} />
      <Skeleton sx={{ marginLeft: "25px", width: 120, height: 21 }} />
      <Skeleton sx={{ marginLeft: "25px", width: 350, height: 58 }} />
      <Skeleton sx={{ marginLeft: "25px", width: 350, height: 96 }} />
      <Skeleton sx={{ margin: "25px 0 0 25px", width: 92, height: 24 }} />
    </Box>
  );
};
export default SkeletonArticle;
