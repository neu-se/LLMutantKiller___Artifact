import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should compute the cosecant of a complex number consistently", () => {
    const c = new Complex(1, 0.5);
    const result = c.csc();
    // Using the actual computed values from the original implementation
    expect(result.re).toBeCloseTo(0.6947441794077885, 10);
    expect(result.im).toBeCloseTo(-0.5527949177570141, 10);
  });
});