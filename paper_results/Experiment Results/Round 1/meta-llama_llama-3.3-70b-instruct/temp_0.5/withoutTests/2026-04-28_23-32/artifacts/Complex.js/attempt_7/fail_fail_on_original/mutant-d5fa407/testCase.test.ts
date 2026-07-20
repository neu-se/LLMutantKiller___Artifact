import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent for a specific case', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(1 / 1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});