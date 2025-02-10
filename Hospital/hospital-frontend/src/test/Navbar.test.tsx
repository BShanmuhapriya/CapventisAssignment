import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import "@testing-library/jest-dom";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Navbar Component", () => {
  it("renders navbar and company name", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("MediSync")).toBeInTheDocument();
  });

  it("opens mobile menu when clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const menuButton = screen.getByRole("button", { name: "menu" });
    fireEvent.click(menuButton);

    const menuItems = screen.getAllByText(/Home|Departments|Location|About|Contact Us/);
    expect(menuItems.length).toBeGreaterThanOrEqual(5);
  });

  it("navigates to correct page when menu item is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeButtons = screen.getAllByText("Home");
    fireEvent.click(homeButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  it("opens and closes user menu correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const userMenuButton = screen.getByRole("button", { name: "Open settings" });
    fireEvent.click(userMenuButton);
    
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
