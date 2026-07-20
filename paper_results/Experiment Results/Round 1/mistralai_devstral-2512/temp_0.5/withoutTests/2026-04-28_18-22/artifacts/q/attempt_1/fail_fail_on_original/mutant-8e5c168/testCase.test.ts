import { Q } from "./q.js";

describe("Q promise constructor", () => {
  it("should throw TypeError when resolver is not a function", () => {
    expect(() => {
      Q.promise("not a function");
    }).toThrow(TypeError);
  });
});