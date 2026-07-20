import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent', () => {
    const complexNumber = new Complex(1, 1);
    const acot = complexNumber.acot();
    const atan = complexNumber.atan();
    expect(acot.re).toBeCloseTo(-atan.re);
    expect(acot.im).toBeCloseTo(-atan.im);
  });
});