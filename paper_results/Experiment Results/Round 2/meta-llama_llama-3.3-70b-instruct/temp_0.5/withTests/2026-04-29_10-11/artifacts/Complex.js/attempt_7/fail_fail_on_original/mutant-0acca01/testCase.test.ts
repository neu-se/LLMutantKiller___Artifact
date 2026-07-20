import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const c = new Complex(2, 1);
    const result = c.acoth();
    const expected = c.re / (c.re * c.re + c.im * c.im);
    expect(result.re).toBeCloseTo(expected);
  });
});