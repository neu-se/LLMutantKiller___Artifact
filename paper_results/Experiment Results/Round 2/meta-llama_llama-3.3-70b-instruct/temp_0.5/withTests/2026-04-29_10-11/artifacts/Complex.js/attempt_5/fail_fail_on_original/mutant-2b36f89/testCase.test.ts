import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(0.2718281828454915, 10);
    expect(result.im).toBeCloseTo(-0.2718281828454915, 10);
  });
});