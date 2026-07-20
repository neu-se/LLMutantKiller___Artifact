import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The correct imaginary part should be approximately 0.25 * atan2(0.5, 0.5)
    // The mutated version would produce 2 * atan2(0.5, 0.5) which is significantly different
    expect(result.im).toBeCloseTo(0.25 * Math.atan2(0.5, 0.5), 6);
  });
});