import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    const originalResult = new Complex(0.5493061443340548, 0);
    expect(result.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});