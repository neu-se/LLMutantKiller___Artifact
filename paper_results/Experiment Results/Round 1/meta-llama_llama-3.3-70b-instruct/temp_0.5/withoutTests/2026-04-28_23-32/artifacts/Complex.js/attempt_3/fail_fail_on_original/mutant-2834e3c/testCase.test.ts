import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a complex number with non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(-0.881, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});