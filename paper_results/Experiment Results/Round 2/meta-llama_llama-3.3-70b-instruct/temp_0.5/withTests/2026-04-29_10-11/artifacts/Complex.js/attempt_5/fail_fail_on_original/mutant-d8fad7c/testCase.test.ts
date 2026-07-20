import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch when the real part is not zero and the condition (a !== 0) is met', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should return Infinity when the real part is zero for acsch', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});