import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toEqual((complex.re !== 0) ? complex.re / 0 : 0);
    expect(result.im).toEqual((complex.im !== 0) ? -complex.im / 0 : 0);
  });
});