import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for a specific value', () => {
    const complex = new Complex(0.5, 0);
    const atanh = complex.atanh();
    const originalResult = new Complex(0.5493061443340548, 0);
    expect(atanh.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});