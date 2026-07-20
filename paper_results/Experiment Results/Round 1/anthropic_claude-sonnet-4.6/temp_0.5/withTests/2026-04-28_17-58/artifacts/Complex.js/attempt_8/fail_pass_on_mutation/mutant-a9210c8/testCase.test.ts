import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atanh', () => {
  it('atanh of a real number greater than 1 should have correct imaginary part', () => {
    const c = new Complex(2, 0);
    const result = c['atanh']();
    // atanh(2) = 0.5*ln(3) - i*pi/2
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});