import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex arcus hyperbolic secant', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result).toBeDefined();
  });
});