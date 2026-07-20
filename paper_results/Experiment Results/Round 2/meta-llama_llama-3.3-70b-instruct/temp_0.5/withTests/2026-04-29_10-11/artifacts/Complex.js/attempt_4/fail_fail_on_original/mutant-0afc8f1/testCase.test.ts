import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex arcus hyperbolic secant', () => {
    const complex = new Complex(0.5, 0);
    expect(() => complex.asech()).not.toThrow();
  });
});