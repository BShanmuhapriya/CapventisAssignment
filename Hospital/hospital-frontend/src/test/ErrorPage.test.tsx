import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

// Mocking react-router-dom's useNavigate function
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ErrorPage Component", () => {
  it("renders the error message correctly", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("The page you are looking for does not exist or has been moved.")).toBeInTheDocument();
  });

  it("navigates to home page when button is clicked", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /return to home/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});
