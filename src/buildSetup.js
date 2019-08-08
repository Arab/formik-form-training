import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

global.buildSetup = (TestComponent, props = {}) => (override = {}) =>
  render(<TestComponent {...props} {...override} />);
