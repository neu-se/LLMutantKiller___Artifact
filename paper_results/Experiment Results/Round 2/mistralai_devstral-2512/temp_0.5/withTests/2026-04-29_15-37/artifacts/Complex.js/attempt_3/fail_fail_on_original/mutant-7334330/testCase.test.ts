import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division mutation test", () => {
  it("should correctly compute division when denominator has small real part", () => {
    const numerator = new Complex(2, 3);
    const denominator = new Complex(0.001, 1);
    const result = numerator.div(denominator);
    expect(result.re).toBeCloseTo(2.002997, 5);
    expect(result.im).toBeCloseTo(-2.997003, 5);
  });
});