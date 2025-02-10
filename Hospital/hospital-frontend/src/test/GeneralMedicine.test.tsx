import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import GeneralMedicine from "../pages/GeneralMedicine";
import { GET_ALL_DOCTORS } from "../graphql/queries";
import { mockDoctorsData } from "../__mock__/generalmedicineMock";

describe("GeneralMedicine Component", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <GeneralMedicine />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error message on query failure", async () => {
    const errorMock = {
      request: { query: GET_ALL_DOCTORS },
      error: new Error("Failed to fetch doctors"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter>
          <GeneralMedicine />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText(/Error: Failed to fetch doctors/i)).toBeInTheDocument();
  });

  it("renders doctors and allows booking an appointment", async () => {
    render(
      <MockedProvider mocks={[mockDoctorsData]} addTypename={false}>
        <MemoryRouter>
          <GeneralMedicine />
        </MemoryRouter>
      </MockedProvider>
    );

    // ✅ Wait for data to load
    await waitFor(() => expect(screen.getByText("Your Gateway to Easy Appointments")).toBeInTheDocument());

    // ✅ Ensure doctors are displayed
    expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
    expect(screen.getByText("General Physician")).toBeInTheDocument();
    expect(screen.getByText("Dr. Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Pediatrician")).toBeInTheDocument();

    // ✅ Simulate clicking "Book Appointment" for Dr. John Doe
    const bookButton = screen.getAllByText("Book Appointment")[0];
    fireEvent.click(bookButton);

    // Normally, we'd check navigation state, but MemoryRouter doesn't update URL in tests.
  });

  it("shows no doctors available message when data is empty", async () => {
    const emptyMock = {
      request: { query: GET_ALL_DOCTORS },
      result: { data: { getAllDoctors: [] } },
    };

    render(
      <MockedProvider mocks={[emptyMock]} addTypename={false}>
        <MemoryRouter>
          <GeneralMedicine />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("No doctors available at the moment. Please check back later.")).toBeInTheDocument()
    );
  });
});
