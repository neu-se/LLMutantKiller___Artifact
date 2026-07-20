import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should compute cosh correctly for small real values", () => {
    const c = new Complex(1e-5, 0);
    const result = c.cosh();
    const expected = 1 - 1e-5; // Using the small value approximation
    expect(result.re).toBeCloseTo(expected, 6);
    expect(result.im).toBeCloseTo(0, 10);
  });
});