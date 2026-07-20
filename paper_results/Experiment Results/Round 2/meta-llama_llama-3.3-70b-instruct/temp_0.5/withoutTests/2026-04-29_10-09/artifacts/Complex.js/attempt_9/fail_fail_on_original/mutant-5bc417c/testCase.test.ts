import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate acoth for complex numbers', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(Number.isNaN(result.re)).toBe(false);
    expect(Number.isNaN(result.im)).toBe(false);
  });
});