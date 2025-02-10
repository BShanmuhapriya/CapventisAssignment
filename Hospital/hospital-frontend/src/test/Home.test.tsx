import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { GET_ALL_DOCTORS } from "../graphql/queries";

const mockDoctorsData = {
  request: {
    query: GET_ALL_DOCTORS,
  },
  result: {
    data: {
      getAllDoctors: [
        { id: "1", name: "Dr. John Doe", specialty: "Cardiologist" },
        { id: "2", name: "Dr. Jane Smith", specialty: "Dermatologist" },
      ],
    },
  },
};

describe("Home Component", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state when query fails", async () => {
    const errorMock = {
      request: { query: GET_ALL_DOCTORS },
      error: new Error("Failed to fetch doctors"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(await screen.findByText(/Error: Failed to fetch doctors/i)).toBeInTheDocument();
  });

  it("renders doctors and appointment button when data is available", async () => {
    render(
      <MockedProvider mocks={[mockDoctorsData]} addTypename={false}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(await screen.findByText(/MediSync: Where Compassion Meets Cutting-Edge Care!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Book an Appointment/i })).toBeInTheDocument();
  });
});
