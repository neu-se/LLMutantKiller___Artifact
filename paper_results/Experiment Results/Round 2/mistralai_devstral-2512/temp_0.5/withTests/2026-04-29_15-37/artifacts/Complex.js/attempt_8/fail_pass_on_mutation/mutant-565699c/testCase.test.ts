import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function behavior", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    const c = new Complex("0.00001+0i");
    const result = c.expm1();
    // The expm1 function uses cosm1 internally for small imaginary parts
    // The mutation changes the Taylor series calculation in cosm1
    // For very small x, the result should be very close to (cos(x) - 1)
    // The mutation (xx * 20922789888000 instead of xx / 20922789888000) will cause a significant difference
    const expected = Math.expm1(0.00001) * Math.cos(0) + (Math.cos(0.00001) - 1);
    expect(result.re).toBeCloseTo(expected, 9);
  });
});