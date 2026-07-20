import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent', () => {
    const complexNumber = new Complex(2, 1);
    const result = complexNumber.acot();
    expect(result.re).toBeCloseTo(-0.5493061443340549);
    expect(result.im).toBeCloseTo(-0.6366197723675814);
  });
});