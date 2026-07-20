import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should detect the mutation in the acsch method', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toEqual(NaN);
    expect(result.im).not.toEqual(NaN);
    expect(result.re).not.toEqual(Infinity);
    expect(result.im).not.toEqual(Infinity);
    expect(result.re).not.toEqual(-Infinity);
    expect(result.im).not.toEqual(-Infinity);
  });
});