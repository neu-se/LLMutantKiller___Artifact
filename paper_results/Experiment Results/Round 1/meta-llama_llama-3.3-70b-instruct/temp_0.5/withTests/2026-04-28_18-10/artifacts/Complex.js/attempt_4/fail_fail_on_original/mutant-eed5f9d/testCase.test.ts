import { Complex } from "./complex";

describe('Complex.js', () => {
  it('should detect the mutation in the acsch method', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});