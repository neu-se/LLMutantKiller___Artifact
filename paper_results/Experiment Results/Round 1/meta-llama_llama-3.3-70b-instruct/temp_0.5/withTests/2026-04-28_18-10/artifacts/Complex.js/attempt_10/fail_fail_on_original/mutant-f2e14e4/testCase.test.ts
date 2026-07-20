import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent', () => {
    const complexNumber = new Complex(1, 1);
    const acot = complexNumber.acot();
    const expectedRe = -0.7853981633974483;
    const expectedIm = -0.0;
    expect(acot.re).toBeCloseTo(expectedRe, 5);
    expect(acot.im).toBeCloseTo(expectedIm, 5);
  });
});