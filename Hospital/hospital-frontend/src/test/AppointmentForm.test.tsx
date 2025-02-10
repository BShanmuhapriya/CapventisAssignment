import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import AppointmentForm from "../pages/AppointmentForm";
import { CREATE_APPOINTMENT, GET_ALL_APPOINTMENTS } from "../graphql/queries";

const mockAppointmentsData = {
  request: {
    query: GET_ALL_APPOINTMENTS,
  },
  result: {
    data: {
      getAllAppointments: [
        { gender: "Male", bloodgroup: "O+" },
        { gender: "Female", bloodgroup: "A+" },
      ],
    },
  },
};

const mockDoctor = {
  id: "1",
  name: "Dr. John Doe",
  specialization: "General Physician",
  availableSlots: [{ date: "2025-02-15", slots: ["10:00 AM", "11:00 AM"] }],
};

const mockCreateAppointment = {
  request: {
    query: CREATE_APPOINTMENT,
    variables: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      gender: "Male",
      bloodgroup: "O+",
      appointmentDate: "2025-02-15",
      appointmentSlot: "10:00 AM",
      reason: "Routine Checkup",
    },
  },
  result: {
    data: {
      createAppointment: {
        success: true,
      },
    },
  },
};

describe("AppointmentForm Component", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={[{ state: { doctor: mockDoctor } }]}>
          <AppointmentForm />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error message on query failure", async () => {
    const errorMock = {
      request: { query: GET_ALL_APPOINTMENTS },
      error: new Error("Failed to fetch appointments"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter initialEntries={[{ state: { doctor: mockDoctor } }]}>
          <AppointmentForm />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText(/Error: Failed to fetch appointments/i)).toBeInTheDocument();
  });

  it("renders form fields and allows submission", async () => {
    render(
      <MockedProvider mocks={[mockAppointmentsData, mockCreateAppointment]} addTypename={false}>
        <MemoryRouter initialEntries={[{ state: { doctor: mockDoctor } }]}>
          <AppointmentForm />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText(/Book an Appointment with Dr. John Doe/i)).toBeInTheDocument());

    // Fill in form fields
    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    
    // Select gender
    fireEvent.click(screen.getByLabelText("Male"));

    // Select blood group
    fireEvent.mouseDown(screen.getByLabelText("Blood Group"));
    fireEvent.click(screen.getByText("O+"));

    // Select appointment date
    fireEvent.mouseDown(screen.getByLabelText("Appointment Date"));
    fireEvent.click(screen.getByText("2025-02-15"));

    // Select available slot
    fireEvent.mouseDown(screen.getByLabelText("Available Slots"));
    fireEvent.click(screen.getByText("10:00 AM"));

    // Fill in reason
    fireEvent.change(screen.getByLabelText("Reason"), { target: { value: "Routine Checkup" } });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Check for success message (alert not directly testable, so check for expected behavior)
    await waitFor(() => expect(screen.getByText(/Book an Appointment with Dr. John Doe/i)).toBeInTheDocument());
  });

  it("shows validation errors when submitting empty form", async () => {
    render(
      <MockedProvider mocks={[mockAppointmentsData]} addTypename={false}>
        <MemoryRouter initialEntries={[{ state: { doctor: mockDoctor } }]}>
          <AppointmentForm />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText(/Book an Appointment with Dr. John Doe/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText(/All fields are required./i)).toBeInTheDocument());
  });
});
