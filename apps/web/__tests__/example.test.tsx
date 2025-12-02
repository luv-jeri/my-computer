import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Simple component for testing
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

describe("Example Test Suite", () => {
  it("should render greeting correctly", () => {
    render(<Greeting name="EvolphinX" />);
    expect(screen.getByText("Hello, EvolphinX!")).toBeInTheDocument();
  });

  it("should pass basic assertion", () => {
    expect(1 + 1).toBe(2);
  });
});
