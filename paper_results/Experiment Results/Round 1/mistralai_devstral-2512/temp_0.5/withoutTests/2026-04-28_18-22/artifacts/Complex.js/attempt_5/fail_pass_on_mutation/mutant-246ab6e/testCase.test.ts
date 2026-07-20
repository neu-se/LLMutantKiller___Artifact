import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for a value where the mutation affects the result", () => {
    const z = new Complex(2, 0);
    const result = z.cosh();
    const expected = (Math.exp(2) + Math.exp(-2)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
  });
});