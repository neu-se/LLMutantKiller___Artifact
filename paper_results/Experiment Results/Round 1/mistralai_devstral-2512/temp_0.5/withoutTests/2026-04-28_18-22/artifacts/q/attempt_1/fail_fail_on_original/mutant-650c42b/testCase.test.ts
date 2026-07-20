import { dispatch } from "./q.js";

describe("dispatch function", () => {
  it("should return a promise when called with valid arguments", () => {
    const obj = { test: "value" };
    const result = dispatch(obj, "get", ["test"]);
    expect(result).toBeInstanceOf(Promise);
  });
});