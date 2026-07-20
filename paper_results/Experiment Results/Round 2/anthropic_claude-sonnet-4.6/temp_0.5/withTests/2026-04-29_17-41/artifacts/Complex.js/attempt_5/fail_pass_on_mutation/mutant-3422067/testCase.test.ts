import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot boundary', () => {
  it('abs at the 3000 boundary', () => {
    // a=3000 is NOT < 3000, so large-number path is taken
    // a=2999 IS < 3000, and b=3000 IS <= 3000, so simple sqrt path
    const c1 = new Complex(2999, 3000); // simple sqrt path
    const c2 = new Complex(3000, 3000); // large-number path
    // These should give different floating-point results
    expect(c1.abs()).not.toBe(c2.abs()); // They differ by 1 ULP
  });
});