import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log', () => {
  it('log of positive real number should have imaginary part of 0', () => {
    const result = new Complex(Math.E, 0).log();
    expect(result.re).toBeCloseTo(1, 14);
    expect(result.im).toBeCloseTo(0, 14);
    expect(result.valueOf()).toBe(1);
  });
});