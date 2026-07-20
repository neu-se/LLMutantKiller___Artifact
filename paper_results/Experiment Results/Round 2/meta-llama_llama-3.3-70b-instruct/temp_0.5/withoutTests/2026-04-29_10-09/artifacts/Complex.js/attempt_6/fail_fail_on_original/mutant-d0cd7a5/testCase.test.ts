import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = complex.acsch();
    const resultMutated = new Complex(1, -2).acsch();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 5);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 5);
  });
});