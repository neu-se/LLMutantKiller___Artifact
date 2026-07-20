import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should return the correct result for the sech function", () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.26583822476487065);
    expect(result.im).toBeCloseTo(-0.24226845720367444);
  });
});