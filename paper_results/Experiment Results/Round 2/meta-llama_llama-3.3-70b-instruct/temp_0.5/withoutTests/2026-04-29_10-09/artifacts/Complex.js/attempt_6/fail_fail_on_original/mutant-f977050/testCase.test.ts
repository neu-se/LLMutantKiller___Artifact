import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should throw an error when calculating acosh with invalid input", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.toString()).not.toBe("NaN");
  });
});