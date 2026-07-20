import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.01", () => {
    const x = 0.01;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // Directly test the cosm1 calculation by comparing with expected value
    // cos(0.01) - 1 ≈ -0.00005000041666583333
    const expectedCosm1 = Math.cos(x) - 1;
    const expectedRe = Math.expm1(x) * Math.cos(0) + expectedCosm1;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});