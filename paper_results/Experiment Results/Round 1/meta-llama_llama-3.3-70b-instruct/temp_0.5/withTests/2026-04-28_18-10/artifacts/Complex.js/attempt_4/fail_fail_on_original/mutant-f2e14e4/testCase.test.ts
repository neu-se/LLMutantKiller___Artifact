import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent', () => {
    const complexNumber = new Complex(1, 1);
    const acot = complexNumber.acot();
    const expected = new Complex(-0.7853981633974483, 0);
    expect(acot.re).toBeCloseTo(expected.re);
    expect(acot.im).toBeCloseTo(expected.im);
  });
});