import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    const expected = new Complex(0.5493061443340548, 0);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});