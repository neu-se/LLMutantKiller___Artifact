import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex valueOf', () => {
  it('valueOf should return the real value for a purely real complex number', () => {
    const z = new Complex(5, 0);
    // Original: im === 0, so returns re = 5
    // Mutated: im !== 0 is false for im=0, so returns null
    expect(z.valueOf()).toBe(5);
  });
});