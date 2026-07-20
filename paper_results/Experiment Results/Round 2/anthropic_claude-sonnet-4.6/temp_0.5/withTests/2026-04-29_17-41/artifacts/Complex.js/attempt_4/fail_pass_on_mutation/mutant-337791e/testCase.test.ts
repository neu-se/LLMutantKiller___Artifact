import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp', () => {
  it('exp of real number should have im === 0 and toString should not show imaginary part', () => {
    const result = new Complex(1, 0).exp();
    expect(result.toString()).toBe(String(Math.E));
  });
});