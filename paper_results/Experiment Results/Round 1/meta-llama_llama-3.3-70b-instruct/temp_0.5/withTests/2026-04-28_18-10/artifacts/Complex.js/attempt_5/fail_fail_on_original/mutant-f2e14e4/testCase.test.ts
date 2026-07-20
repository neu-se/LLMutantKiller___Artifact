import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent', () => {
    const complexNumber = new Complex(1, 1);
    const acot = complexNumber.acot();
    expect(acot.re).toBeCloseTo(-0.7853981633974483);
    expect(acot.im).toBeCloseTo(-0.0);
  });
});