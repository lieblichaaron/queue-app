// import React from "react";
// import ReactDOM from "react-dom";
// import "@testing-library/jest-dom";
// import "@testing-library/user-event";
import { shallow } from "enzyme";
// import { render, screen } from "@testing-library/react";
import TitleBanner from "../title_banner/titleBanner";
import CreatLine from "./createLine";
// import userEvent from "@testing-library/user-event";

it("renders without crashing", () => {
  shallow(<CreatLine />);
});

it("renders title banner", () => {
  const props = {
    title: "Line Setup",
  };
  const wrapper = shallow(<CreatLine />);
  const welcome = <TitleBanner {...props} />;
  expect(wrapper.contains(welcome)).toEqual(true);
});
