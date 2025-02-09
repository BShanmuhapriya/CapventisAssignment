import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DOCTORS } from "../graphql/queries";
import { Doctor } from "../types";
import { Box, Card, Typography, CircularProgress, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const GeneralMedicine: React.FC = () => {
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

  const handleBookAppointment = (doctor: Doctor) => {
    navigate("/appointment-form", { state: { doctor } }); // Pass selected doctor's details
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Box className="p-6 text-center">
        <Typography variant="h4" className="text-gray-800 font-bold">
          Your Gateway to Easy Appointments
        </Typography>
        <Typography variant="h5" className="text-gray-600 mt-2">
          Feel better with our specialists' diagnosis.
        </Typography>
      </Box>

      {/* Doctors List */}
      <Box className="flex flex-wrap justify-center gap-6 p-4">
        {data?.getAllDoctors && data.getAllDoctors.length > 0 ? (
          data.getAllDoctors.map((doctor: Doctor) => (
            <Card key={doctor.id} className="w-80 p-4 shadow-lg rounded-lg border border-gray-300 bg-white">
              <Typography variant="h5" className="font-semibold text-gray-800">
                {doctor.name}
              </Typography>
              <Typography className="text-gray-600">{doctor.specialization}</Typography>
              <Typography className="text-gray-500">Fees: €{doctor.fees}</Typography>
              <Button
                variant="contained"
                className="mt-4 w-full py-2 !text-white !bg-blue-900 font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
                onClick={() => handleBookAppointment(doctor)}
              >
                Book Appointment
              </Button>
            </Card>
          ))
        ) : (
          <Typography variant="h6" className="text-center text-gray-600">
            No doctors available at the moment. Please check back later.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default GeneralMedicine;
