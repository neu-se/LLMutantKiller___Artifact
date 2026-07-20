import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should detect the mutation in the acsch method', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});