import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should return correct result when imaginary part is non-zero", () => {
    const c = new Complex(0, Math.PI/2);
    const result = c.exp();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1);
  });
});