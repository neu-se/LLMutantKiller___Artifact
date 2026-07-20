import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("should return the correct inverse for a simple real number", () => {
    const c = new Complex(4, 0);
    const result = c.inverse();
    expect(result.re).toBe(0.25);
    expect(result.im).toBeCloseTo(0);
  });
});