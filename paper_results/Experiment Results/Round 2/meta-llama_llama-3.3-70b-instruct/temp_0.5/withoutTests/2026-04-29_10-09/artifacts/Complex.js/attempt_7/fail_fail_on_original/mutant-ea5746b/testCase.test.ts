import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return different results for expm1 when using original and mutated code', () => {
    const complex = new Complex(0.01);
    const resultOriginal = complex.expm1();
    const resultMutated = new Complex(0.01).expm1();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
  });
});