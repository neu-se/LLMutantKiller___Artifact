import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for the expm1 function with a small imaginary part", () => {
    const complex = new Complex(0, 0.0001);
    const result = complex.expm1();
    const originalResult = Math.expm1(0) * Math.cos(0.0001) + Math.cos(0.0001);
    expect(result.re).toBeCloseTo(originalResult);
  });
});