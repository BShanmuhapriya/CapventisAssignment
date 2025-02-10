import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import '@testing-library/jest-dom';

// Test suite for Footer component
describe("Footer Component", () => {
  it("renders Company section correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Clinical Care")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("FAQ's")).toBeInTheDocument();
  });

  it("renders Our Services section correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Annual Checkup")).toBeInTheDocument();
    expect(screen.getByText("Ambulance Services")).toBeInTheDocument();
    expect(screen.getByText("Blood Bank Services")).toBeInTheDocument();
    expect(screen.getByText("Laboratory Services")).toBeInTheDocument();
  });

  it("renders Contact Information section correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText("Contact Information")).toBeInTheDocument();
    expect(screen.getByText("Dublin, Ireland")).toBeInTheDocument();
    expect(screen.getByText("5+ Locations")).toBeInTheDocument();
    expect(screen.getByText("contact@medisync.com")).toBeInTheDocument();
    expect(screen.getByText("medisync.com")).toBeInTheDocument();
    expect(screen.getByText("+353-899624924")).toBeInTheDocument();
  });
});
