import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the acsch function', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(1);
    expect(result.re).toBeCloseTo(-0.48121182505960347);
    expect(result.im).toBeCloseTo(-0.8964764198488289);
  });
});