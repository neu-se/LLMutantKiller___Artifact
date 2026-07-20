import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a finite value', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.asec().re).not.toBe(0);
  });
});