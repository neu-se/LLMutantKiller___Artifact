import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when input is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Infinity);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});