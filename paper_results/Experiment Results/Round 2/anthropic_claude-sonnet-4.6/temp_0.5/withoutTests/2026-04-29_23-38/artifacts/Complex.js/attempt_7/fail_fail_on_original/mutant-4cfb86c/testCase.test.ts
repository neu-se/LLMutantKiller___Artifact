import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should detect mutation: atan(0, Inf) vs atan(NaN, Inf) differ in im part', () => {
    // Direct test to understand behavior
    const r1 = new Complex(0, Infinity).atan();
    const r2 = new Complex(NaN, Infinity).atan();
    // If these differ, we can use acot to detect the mutation
    // Let's check the im parts specifically
    expect(isNaN(r1.im)).not.toBe(isNaN(r2.im));
  });
});