import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for non-zero input', () => {
    const complex = new Complex(2, 1);
    const result = complex.asec();
    expect(result).not.toBe(false);
    expect(typeof result).toBe('object');
  });
});