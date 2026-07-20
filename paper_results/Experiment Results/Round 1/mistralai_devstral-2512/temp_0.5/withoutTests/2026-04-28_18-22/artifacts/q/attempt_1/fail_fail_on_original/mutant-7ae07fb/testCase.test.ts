import { promise } from "./q";

describe("promise constructor", () => {
  it("should throw a TypeError with a descriptive message when resolver is not a function", () => {
    expect(() => {
      promise("not a function");
    }).toThrow("resolver must be a function.");
  });
});