import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = Math.PI/4", () => {
    const x = Math.PI/4;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For x = PI/4, we should use the direct Math.cos calculation
    // since it's outside the Taylor series range (-PI/4 to PI/4)
    const expectedCosm1 = Math.cos(x) - 1;
    const expectedRe = Math.expm1(x) * Math.cos(0) + expectedCosm1;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});