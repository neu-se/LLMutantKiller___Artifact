import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle the case where d !== 0 by computing asinh of reciprocal", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes (d !== 0) to (d === 0), which would incorrectly
    // take the else branch when d is not zero. This test verifies the correct branch is taken.
    expect(result.re).toBeCloseTo(0.3217505543966422, 5);
    expect(result.im).toBeCloseTo(-0.40235947810852506, 5);
  });
});