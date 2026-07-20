import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0);
  });
});