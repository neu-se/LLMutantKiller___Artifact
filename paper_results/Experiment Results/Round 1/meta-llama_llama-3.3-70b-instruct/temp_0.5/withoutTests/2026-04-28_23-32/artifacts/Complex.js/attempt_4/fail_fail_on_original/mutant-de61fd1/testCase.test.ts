import { Complex } from "../complex.js";

describe("Complex", () => {
  it("should return the correct result for the sech function", () => {
    const complex = new Complex(0, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(0);
  });
});