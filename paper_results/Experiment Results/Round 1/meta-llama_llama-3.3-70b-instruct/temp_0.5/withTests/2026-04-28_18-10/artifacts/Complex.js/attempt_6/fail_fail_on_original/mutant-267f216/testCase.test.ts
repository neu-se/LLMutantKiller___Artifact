import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    const expected = c.asinh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});