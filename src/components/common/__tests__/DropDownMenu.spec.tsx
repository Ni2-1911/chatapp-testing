import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DropdownMenu from "../DropdownMenu";

describe("DropdownMenu", () => {
  it("renders children correctly", () => {
    render(
      <DropdownMenu>
        <li>Item 1</li>
        <li>Item 2</li>
      </DropdownMenu>
    );
    const summaryElement = screen.getByTestId("dropdown-summary");
    expect(summaryElement).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeVisible();
    expect(screen.queryByText("Item 2")).not.toBeVisible();
  });

  it("toggles visibility of children when summary is clicked", () => {
    render(
      <DropdownMenu>
        <li>Item 1</li>
        <li>Item 2</li>
      </DropdownMenu>
    );
    const summaryElement = screen.getByTestId("dropdown-summary");
    summaryElement.click();
    expect(screen.getByText("Item 1")).toBeVisible();
    expect(screen.getByText("Item 2")).toBeVisible();
    summaryElement.click();
    expect(screen.queryByText("Item 1")).not.toBeVisible();
    expect(screen.queryByText("Item 2")).not.toBeVisible();
  });
});
