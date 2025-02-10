import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import DepartmentsComponent from "../pages/Departments";
import { GET_ALL_DEPARTMENTS } from "../graphql/queries";
import { mockDepartmentsData } from "../__mock__/departmentsMock";


describe("DepartmentsComponent", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <DepartmentsComponent />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error message on query failure", async () => {
    const errorMock = {
      request: { query: GET_ALL_DEPARTMENTS },
      error: new Error("Failed to fetch departments"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter>
          <DepartmentsComponent />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText(/Error: Failed to fetch departments/i)).toBeInTheDocument();
  });

  it("renders list of departments and navigates on click", async () => {
    render(
      <MockedProvider mocks={[mockDepartmentsData]} addTypename={false}>
        <MemoryRouter>
          <DepartmentsComponent />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText("Services offered by us for you")).toBeInTheDocument());

    expect(screen.getByText("Cardiology")).toBeInTheDocument();
    expect(screen.getByText("Neurology")).toBeInTheDocument();
    expect(screen.getByText("Pediatrics")).toBeInTheDocument();


    const cardiologyCard = screen.getByText("Cardiology");
    fireEvent.click(cardiologyCard);
  });
});
