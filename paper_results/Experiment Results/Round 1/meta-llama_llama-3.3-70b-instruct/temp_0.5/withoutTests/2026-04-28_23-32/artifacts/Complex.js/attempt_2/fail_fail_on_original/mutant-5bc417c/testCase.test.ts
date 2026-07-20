import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expected = new Complex(0.5493061443340548, -0.5493061443340548);
    expect(Math.abs(result.re - expected.re) < 0.000001).toBe(true);
    expect(Math.abs(result.im - expected.im) < 0.000001).toBe(true);
  });
});