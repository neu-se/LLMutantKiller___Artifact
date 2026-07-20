import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('e^(i*pi) should equal -1 using pow', () => {
    // e^(i*pi) = cos(pi) + i*sin(pi) = -1
    const e = new Complex(Math.E, 0);
    const result = e.pow(new Complex(0, Math.PI));
    expect(result.re).toBeCloseTo(-1, 10);
    expect(Math.abs(result.im)).toBeLessThan(1e-10);
  });
});