import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for the exp function with a small real part", () => {
    const complex = new Complex(0.0001, 0);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(Math.exp(0.0001));
    expect(result.im).toBeCloseTo(0);
  });
});