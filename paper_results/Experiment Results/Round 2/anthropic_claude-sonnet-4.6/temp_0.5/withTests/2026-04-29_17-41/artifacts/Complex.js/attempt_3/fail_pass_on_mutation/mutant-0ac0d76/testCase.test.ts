import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex log', () => {
  it('log of complex number with positive real and nonzero imaginary part', () => {
    // log(1 + i) = log(sqrt(2)) + i*pi/4
    const z = new Complex(1, 1).log();
    expect(z.re).toBeCloseTo(Math.log(Math.sqrt(2)), 10);
    expect(z.im).toBeCloseTo(Math.PI / 4, 10);
  });
});