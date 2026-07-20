import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('atan of (0, -Infinity) should not be NaN to verify our understanding', () => {
    const result = new Complex(0, -Infinity).atan();
    // If this is NaN, both original and mutated give NaN for acot(1e-200, -1e-300)
    // If this is not NaN, mutated gives different result than original
    expect(result.re).toBeCloseTo(-Math.PI / 2, 5);
  });
});