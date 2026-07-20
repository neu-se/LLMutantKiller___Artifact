import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex log direct', () => {
  it('log of a number with zero imaginary and positive real returns correct angle', () => {
    const z = new Complex(5, 0).log();
    expect(z.re).toBeCloseTo(Math.log(5), 15);
    expect(z.im).toBe(0);
  });
});