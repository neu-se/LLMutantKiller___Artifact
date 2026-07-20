import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = complex.acsc();
    const complexMutated = new Complex(1, 2);
    const resultMutated = complexMutated.acsc();
    expect(resultOriginal.re).not.toEqual(resultMutated.re);
  });
});