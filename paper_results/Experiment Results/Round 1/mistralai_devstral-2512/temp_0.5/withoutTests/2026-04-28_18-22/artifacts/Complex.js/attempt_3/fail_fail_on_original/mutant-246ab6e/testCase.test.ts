import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for a negative value", () => {
    const z = new Complex(-0.5, 0);
    const result = z.cosh();
    const expected = (Math.exp(-0.5) + Math.exp(0.5)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
  });
});