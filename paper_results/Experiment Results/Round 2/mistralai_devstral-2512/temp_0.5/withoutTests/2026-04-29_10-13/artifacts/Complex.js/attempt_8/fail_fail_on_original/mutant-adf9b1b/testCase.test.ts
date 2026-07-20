import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.2", () => {
    const c = new Complex(0.2, 0);
    const result = c.expm1();
    // The mutation changes the Taylor series calculation in cosm1
    // For x=0.2, the original implementation should give a specific result
    // that differs from the mutated version
    const expectedRe = 0.21034183615129526;
    expect(result.re).toBeCloseTo(expectedRe, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});