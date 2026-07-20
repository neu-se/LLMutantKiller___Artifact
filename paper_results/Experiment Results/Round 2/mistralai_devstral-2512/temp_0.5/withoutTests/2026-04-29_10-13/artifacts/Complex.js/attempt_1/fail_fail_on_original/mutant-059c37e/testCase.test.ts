import { Complex } from "./complex.js";

describe("Complex.atan", () => {
  it("should return correct value for atan(0, -1)", () => {
    const result = new Complex(0, -1).atan();
    expect(result.im).toBe(-Infinity);
  });
});