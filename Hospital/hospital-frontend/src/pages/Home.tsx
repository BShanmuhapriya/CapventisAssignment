import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOCTORS } from "../graphql/queries";
import { Doctor } from "../types";
import { Box, Card, Typography, CircularProgress, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import homeImage from "../pages/Doctors.webp";
import Footer from "../components/Footer";
import Services from "./Services";
import FeedbackComponent from "./Feedback";
import Rewards from "../components/Rewards";

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<{ getAllDoctors: Doctor[] }>(GET_ALL_DOCTORS);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <p className="text-red-500 text-center">Error: {error.message}</p>
    );

  const handleBookAppointment = () => {
    navigate("/departments"); // Navigate to the Appointment Form page
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <Box className="p-4">
        <Typography variant="h4" className="text-center text-gray-800 font-bold">
          MediSync: Where Compassion Meets Cutting-Edge Care!
        </Typography>

        {/* Image and Rewards Section (Responsive) */}
        <Box className="flex flex-col lg:flex-row items-center justify-center w-full py-6 space-y-6 lg:space-y-0 lg:space-x-8">
          <img
            src={homeImage}
            alt="Medical Team"
            className="w-full max-w-lg lg:max-w-2xl h-auto rounded-lg shadow-md"
          />
          <Rewards />
        </Box>

        {/* Services and Feedback Section */}
        <Box className="mt-10 space-y-10">
          <Services />
          <FeedbackComponent />
        </Box>

        {/* Appointment Booking Button (Visible on Mobile & Tablet) */}
        <div className="flex justify-center mt-6">
          <Button
            variant="contained"
            color="primary"
            className="text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={handleBookAppointment}
          >
            Book an Appointment
          </Button>
        </div>
      </Box>

      <Footer />
    </div>
  );
};

export default Home;
