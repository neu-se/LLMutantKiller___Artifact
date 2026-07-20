import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly for a real number', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    const expected = new Complex(Math.log(2 + Math.sqrt(5)), 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});