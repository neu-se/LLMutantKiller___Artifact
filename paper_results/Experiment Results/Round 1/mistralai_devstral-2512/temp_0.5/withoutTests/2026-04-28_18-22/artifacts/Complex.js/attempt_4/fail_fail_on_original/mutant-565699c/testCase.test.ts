import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute expm1 for small complex numbers", () => {
    // Test with a small imaginary value where cosm1 is used
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    // For small imaginary numbers, expm1 should be close to (0, x)
    // The mutation would cause cosm1 to return a much larger value
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.1, 10);
  });
});