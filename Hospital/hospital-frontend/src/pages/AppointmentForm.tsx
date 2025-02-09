import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_APPOINTMENT, GET_ALL_APPOINTMENTS } from "../graphql/queries";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  RadioGroup,
  CircularProgress,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "./backimage.webp"; // Dynamically Import Background Image

const AppointmentForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDoctor = location.state?.doctor;

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    appointmentDate: "",
    appointmentSlot: "",
    reason: "",
    gender: "",
    bloodgroup: "",
  });

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const { loading, error, data } = useQuery<{ getAllAppointments: { gender: string; bloodgroup: string }[] }>(
    GET_ALL_APPOINTMENTS
  );

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "appointmentDate" && { appointmentSlot: "" }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.email ||
      !formState.gender ||
      !formState.bloodgroup ||
      !formState.appointmentDate ||
      !formState.appointmentSlot ||
      !formState.reason
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      await createAppointment({ variables: { ...formState } });
      alert("Appointment created successfully! We will get back to you with confirmation.");

      setTimeout(() => {
        navigate("/home");
      }, 1500); // Short delay for user feedback before redirecting
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div
      className="bg-gray-100 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <Typography variant="h4" className="text-center font-bold text-gray-800">
          Book an Appointment with {selectedDoctor?.name}
        </Typography>
        <Typography variant="h5" className="text-center text-gray-600">
          Specialization: {selectedDoctor?.specialization}
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg border border-gray-300 shadow-lg w-full max-w-md bg-white bg-opacity-95 mt-6 space-y-4"
        >
          <TextField fullWidth name="firstName" label="First Name" onChange={handleTextFieldChange} required />
          <TextField fullWidth name="lastName" label="Last Name" onChange={handleTextFieldChange} required />
          <TextField fullWidth name="email" label="Email" onChange={handleTextFieldChange} required />

          {/* Gender & Blood Group - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormControl fullWidth>
              <Typography variant="subtitle1" className="text-gray-700">
                Gender:
              </Typography>
              <RadioGroup name="gender" value={formState.gender} onChange={handleTextFieldChange}>
                {data?.getAllAppointments &&
                  [...new Set(data.getAllAppointments.map((entry) => entry.gender))].map((gender) => (
                    <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                  ))}
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Blood Group</InputLabel>
              <Select name="bloodgroup" value={formState.bloodgroup} onChange={handleSelectChange}>
                {data?.getAllAppointments
                  ?.filter((entry, index, self) => self.findIndex((t) => t.bloodgroup === entry.bloodgroup) === index)
                  .map((entry) => (
                    <MenuItem key={entry.bloodgroup} value={entry.bloodgroup}>
                      {entry.bloodgroup}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          {/* Appointment Date Dropdown */}
          <FormControl fullWidth required>
            <InputLabel>Appointment Date</InputLabel>
            <Select name="appointmentDate" value={formState.appointmentDate} onChange={handleSelectChange}>
              {selectedDoctor?.availableSlots?.map((slot: { date: string; slots: string[] }) => (
                <MenuItem key={slot.date} value={slot.date}>
                  {slot.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Available Slots Dropdown */}
          <FormControl fullWidth required>
            <InputLabel>Available Slots</InputLabel>
            <Select name="appointmentSlot" value={formState.appointmentSlot} onChange={handleSelectChange}>
              {selectedDoctor?.availableSlots
                ?.find((slot: { date: string; slots: string[] }) => slot.date === formState.appointmentDate)
                ?.slots.map((slotTime: string) => (
                  <MenuItem key={slotTime} value={slotTime}>
                    {slotTime}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <TextField fullWidth name="reason" label="Reason" onChange={handleTextFieldChange} required />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-4 py-2 text-white !bg-blue-900 font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            Submit
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentForm;
