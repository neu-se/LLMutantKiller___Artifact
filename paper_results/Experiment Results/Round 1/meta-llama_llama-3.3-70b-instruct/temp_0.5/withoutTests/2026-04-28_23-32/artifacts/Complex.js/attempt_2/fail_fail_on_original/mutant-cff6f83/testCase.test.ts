import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const expected = new Complex(0.48121182505960347, -0.48121182505960347);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});