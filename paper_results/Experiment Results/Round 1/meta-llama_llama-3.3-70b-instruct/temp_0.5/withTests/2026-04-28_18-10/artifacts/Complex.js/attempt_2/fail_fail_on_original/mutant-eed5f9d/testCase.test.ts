import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should detect the mutation in the acsch method', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});