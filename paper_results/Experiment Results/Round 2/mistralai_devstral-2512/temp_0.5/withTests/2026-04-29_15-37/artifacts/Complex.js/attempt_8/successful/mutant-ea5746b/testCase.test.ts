import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute cos(x) - 1 for x near PI/4 boundary", () => {
    const x = Math.PI / 4 - 0.001; // Just below the boundary where Taylor series is used
    const c = new Complex(0, x);
    const result = c.expm1();
    // This tests the boundary condition of the cosm1 function
    // The mutation changes the sign in the Taylor series calculation
    const expectedReal = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 12);
  });
});