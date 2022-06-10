import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toolbar from "./toolbar";

it("toolbar renders", () => {
  render(<Toolbar />);
  const toolbar = screen.getAllByText(/\w*/, { selector: "div" })[1]; //there is an enclosing div
  expect(toolbar.children.length).toBe(10);
});
