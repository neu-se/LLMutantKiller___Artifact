import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acotangent', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    const originalResult = new Complex((b !== 0) ? -b / 0 : 0).atan();
    expect(result.im).not.toBeCloseTo(originalResult.im, 10);
  });
});