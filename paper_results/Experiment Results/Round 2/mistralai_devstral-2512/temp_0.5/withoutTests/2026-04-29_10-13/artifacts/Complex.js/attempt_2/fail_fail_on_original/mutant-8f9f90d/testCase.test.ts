import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero real part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5 * Math.log((1 + 0.5) / (1 - 0.5)) / 2, 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});