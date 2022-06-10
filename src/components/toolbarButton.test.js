import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
//import userEvent from "@testing-library/user-event";
import ToolbarButton from "./toolbarButton";

it("button renders symbol", () => {
  render(<ToolbarButton btnId={0} btnSym={"B"} btnOn={false} onClick={null} />);
  const button = screen.getByText("B");
  expect(button).toBeInTheDocument;
});

it("button turns on", () => {
  render(<ToolbarButton btnId={0} btnSym={"B"} btnOn={false} onClick={null} />);
  const button = screen.getByText("B");
  fireEvent.mouseUp(button); //don't need userEvent, rather imported fireEvent
  expect(button).toHaveClass("ToolbarButtonMouseUp"); //needs jest-dom
});
