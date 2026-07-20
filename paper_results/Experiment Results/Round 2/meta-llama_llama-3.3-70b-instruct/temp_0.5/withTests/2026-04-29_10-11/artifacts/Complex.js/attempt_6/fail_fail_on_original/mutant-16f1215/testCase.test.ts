import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly for non-zero values', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});