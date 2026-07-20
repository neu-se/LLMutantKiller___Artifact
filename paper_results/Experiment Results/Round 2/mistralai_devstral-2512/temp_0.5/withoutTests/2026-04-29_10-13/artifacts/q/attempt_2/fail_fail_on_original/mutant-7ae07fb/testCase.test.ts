import { Q } from "./q.js";

describe("promise constructor", () => {
  it("should throw a TypeError with a descriptive message when resolver is not a function", () => {
    expect(() => {
      Q.promise(undefined as any);
    }).toThrow("resolver must be a function.");
  });
});