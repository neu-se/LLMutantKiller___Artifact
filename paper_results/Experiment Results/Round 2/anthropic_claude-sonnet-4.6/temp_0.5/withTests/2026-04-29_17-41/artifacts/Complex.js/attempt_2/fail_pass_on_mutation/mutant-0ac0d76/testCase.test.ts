import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex log', () => {
  it('log of negative real number should have imaginary part equal to PI', () => {
    const z = new Complex(-1, 0).log();
    expect(z.re).toBeCloseTo(0, 10);
    expect(z.im).toBeCloseTo(Math.PI, 10);
  });
});