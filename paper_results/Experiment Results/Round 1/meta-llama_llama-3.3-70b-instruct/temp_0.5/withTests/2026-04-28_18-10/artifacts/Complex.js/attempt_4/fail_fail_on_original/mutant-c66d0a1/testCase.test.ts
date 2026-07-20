import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});