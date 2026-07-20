import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should return correct result for complex number with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.exp();
    expect(result.re).toBeCloseTo(Math.cos(1));
    expect(result.im).toBeCloseTo(Math.sin(1));
  });
});