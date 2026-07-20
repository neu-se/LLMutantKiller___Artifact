import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 2);
    const result = complex.acsch();
    const expected = new Complex(0.48121182505960347, -0.8964764813821068);
    expect(Math.abs(result.re - expected.re)).toBeLessThan(1e-5);
    expect(Math.abs(result.im - expected.im)).toBeLessThan(1e-5);
  });
});