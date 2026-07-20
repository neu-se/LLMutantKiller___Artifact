import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acsc();
    const complexMutated = new Complex(1, 1);
    const resultMutated = complexMutated.acsc();
    expect(resultOriginal.re).not.toEqual(resultMutated.re);
    expect(resultOriginal.im).not.toEqual(resultMutated.im);
  });
});