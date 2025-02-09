import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_FEEDBACK } from "../graphql/queries"; // Ensure correct import
import { CircularProgress, Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Feedback } from "../types";

const FeedbackComponent: React.FC = () => {
  const { loading, error, data } = useQuery<{ getAllFeedback: Feedback[] }>(GET_ALL_FEEDBACK);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box className="flex justify-center items-center">
      <Box className="w-full max-w-2xl text-center">
        <Typography variant="h4" align="center">Patient Feedback</Typography>
        <Carousel indicators={true} animation="slide" navButtonsAlwaysVisible={true} className="max-w-2xl mx-auto">
          {data?.getAllFeedback?.map((item, index) => (
            <Paper key={index} sx={{ padding: 4, textAlign: "center" }}>
              <Typography variant="h6">⭐ {item.rating}/5</Typography>
              <Typography>{item.feedback}</Typography>
            </Paper>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default FeedbackComponent;
