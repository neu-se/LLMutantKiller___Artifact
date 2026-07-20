import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent for a specific case', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});