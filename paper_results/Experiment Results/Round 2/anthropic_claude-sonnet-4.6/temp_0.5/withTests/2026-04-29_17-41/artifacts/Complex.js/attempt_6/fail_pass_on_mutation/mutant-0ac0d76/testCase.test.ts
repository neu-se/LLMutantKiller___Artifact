import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex asin', () => {
  it('asin of 2 (value outside [-1,1]) should have correct real and imaginary parts', () => {
    // asin(2) = pi/2 - i*log(2 + sqrt(3))
    const z = new Complex(2, 0).asin();
    expect(z.re).toBeCloseTo(Math.PI / 2, 10);
    expect(z.im).toBeCloseTo(-Math.log(2 + Math.sqrt(3)), 10);
  });
});