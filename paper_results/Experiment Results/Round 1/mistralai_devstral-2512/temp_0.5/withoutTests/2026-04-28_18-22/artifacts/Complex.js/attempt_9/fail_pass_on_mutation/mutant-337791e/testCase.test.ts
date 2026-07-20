import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should handle negative real numbers correctly", () => {
    const c = new Complex(-1, 0);
    const result = c.exp();
    expect(result.re).toBeCloseTo(1/Math.E);
    expect(result.im).toBe(0);
  });
});