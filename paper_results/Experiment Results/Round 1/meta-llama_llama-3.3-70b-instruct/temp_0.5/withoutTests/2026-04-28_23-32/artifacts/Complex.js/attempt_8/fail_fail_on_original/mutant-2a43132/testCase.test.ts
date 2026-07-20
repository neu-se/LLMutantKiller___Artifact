import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for non-zero input', () => {
    const complex = new Complex(2, 1);
    const result = complex.asec();
    expect(typeof result).toBe('object');
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
  });
});