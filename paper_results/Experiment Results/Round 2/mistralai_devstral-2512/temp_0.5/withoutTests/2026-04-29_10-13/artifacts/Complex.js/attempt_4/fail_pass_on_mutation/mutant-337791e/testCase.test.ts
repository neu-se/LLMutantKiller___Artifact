import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp", () => {
  it("should return correct result for purely real input", () => {
    const c = new Complex(2, 0);
    const result = c.exp();
    expect(result.re).toBeCloseTo(Math.exp(2));
    expect(result.im).toBe(0);
  });
});