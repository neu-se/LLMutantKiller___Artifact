import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});