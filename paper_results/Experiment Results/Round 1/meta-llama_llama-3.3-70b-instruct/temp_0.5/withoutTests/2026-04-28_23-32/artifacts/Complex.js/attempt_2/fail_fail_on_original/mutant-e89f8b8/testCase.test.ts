import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(0.5773502691896258, 10);
    expect(result.im).toBeCloseTo(-0.5773502691896258, 10);
  });
});