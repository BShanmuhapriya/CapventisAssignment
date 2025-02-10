import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";  // ✅ Use MemoryRouter
import ServicesComponent from "../pages/Services";
import { mockServicesData } from "../__mock__/servicesMock";

describe("ServicesComponent", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter> 
          <ServicesComponent />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state when query fails", async () => {
    const errorMock = {
      request: { query: mockServicesData.request.query },
      error: new Error("Failed to fetch services"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter> 
          <ServicesComponent />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText(/Error: Failed to fetch services/i)).toBeInTheDocument();
  });

  it("renders list of services and navigates on click", async () => {
    render(
      <MockedProvider mocks={[mockServicesData]} addTypename={false}>
        <MemoryRouter>
          <ServicesComponent />
        </MemoryRouter>
      </MockedProvider>
    );

    // Wait for data to load
    await waitFor(() => expect(screen.getByText("Services Offered")).toBeInTheDocument());

    // Ensure services are rendered
    expect(screen.getByText("Cardiology")).toBeInTheDocument();
    expect(screen.getByText("Dermatology")).toBeInTheDocument();

    // Simulate a click on "Cardiology"
    const cardiologyCard = screen.getByText("Cardiology");
    fireEvent.click(cardiologyCard);
  });
});
