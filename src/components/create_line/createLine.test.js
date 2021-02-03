import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import CreatLine from "./createLine";
import { addNewLine } from "../../serverFuncs";
import ShallowRenderer from "react-test-renderer/shallow";
import userEvent from "@testing-library/user-event";
import { shallow, mount } from "enzyme";

jest.mock("../../serverFuncs");

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Create line page works", () => {
  it("renders without crashing", () => {
    const container = document.createElement("div");
    ReactDOM.render(<CreatLine />, container);
    const unmounted = ReactDOM.unmountComponentAtNode(container);
    expect(unmounted).toBe(true);
  });

  it("renders title banner", () => {
    const { unmount } = render(<CreatLine />);
    const title = screen.queryByText("Line Setup");
    expect(title).toBeTruthy();
    unmount();
  });

  it("Form submission generates qr", async () => {
    const { unmount } = render(<CreatLine />);
    expect(screen.queryByTestId("qr")).not.toBeInTheDocument();
    addNewLine.mockImplementation((lineObj) => {
      return "1234567";
    });
    const submitButton = screen.getByRole("button", { name: "submit" });

    userEvent.type(screen.getByPlaceholderText("Enter store name"), "Burgers");
    userEvent.type(
      screen.getByTestId("Auto complete"),
      "Aarey Rd, Churi Wadi, Goregaon, Mumbai, Maharashtra, India"
    );
    userEvent.selectOptions(screen.getByTestId("avg time select"), ["1"]);
    await act(async () => {
      userEvent.click(submitButton);
    });
    expect(screen.getByTestId("qr")).toBeInTheDocument();
    unmount();
  });

  it("Redirects after pressing finish button", async () => {
    const { unmount } = render(<CreatLine />);
    addNewLine.mockImplementation(() => {
      return "1234567";
    });
    const submitButton = screen.getByRole("button", { name: "submit" });

    userEvent.type(screen.getByPlaceholderText("Enter store name"), "Burgers");
    userEvent.type(
      screen.getByTestId("Auto complete"),
      "Aarey Rd, Churi Wadi, Goregaon, Mumbai, Maharashtra, India"
    );
    userEvent.selectOptions(screen.getByTestId("avg time select"), ["1"]);
    await act(async () => {
      userEvent.click(submitButton);
    });
    expect(screen.getByText("Head to line!")).toBeInTheDocument();
    userEvent.click(screen.getByText("Head to line!"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/line/1234567");
    unmount();
  });
});
