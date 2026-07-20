import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should return correct result for pure imaginary number", () => {
    const c = new Complex(0, Math.PI);
    const result = c.exp();
    expect(result.re).toBeCloseTo(-1);
    expect(result.im).toBeCloseTo(0);
  });
});