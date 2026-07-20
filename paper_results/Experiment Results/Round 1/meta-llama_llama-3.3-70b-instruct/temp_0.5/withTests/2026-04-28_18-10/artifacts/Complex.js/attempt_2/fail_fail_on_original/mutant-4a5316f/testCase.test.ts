import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth when b is positive', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });

  it('should return the correct result for acoth when b is negative', () => {
    const complex = new Complex(0, -1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});