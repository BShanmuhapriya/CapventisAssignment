import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <Box className="flex flex-col items-center justify-center flex-grow p-6 text-center">
        <Typography variant="h4" className="text-gray-800 font-bold">
          Page Not Found
        </Typography>
        <Typography variant="body1" className="text-gray-600 mt-2">
          The page you are looking for does not exist or has been moved.
        </Typography>

        {/* Return Home Button */}
        <Button
          variant="contained"
          color="primary"
          className="mt-6 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
          onClick={() => navigate("/home")}
        >
          Return to Home
        </Button>
      </Box>
    </div>
  );
};

export default ErrorPage;
