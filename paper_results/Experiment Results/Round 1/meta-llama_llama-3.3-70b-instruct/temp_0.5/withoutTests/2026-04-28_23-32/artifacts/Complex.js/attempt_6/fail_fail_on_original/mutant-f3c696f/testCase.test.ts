import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acotangent', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acot();
    const complexMutated = new Complex(1, 1);
    const resultMutated = complexMutated.acot();
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});