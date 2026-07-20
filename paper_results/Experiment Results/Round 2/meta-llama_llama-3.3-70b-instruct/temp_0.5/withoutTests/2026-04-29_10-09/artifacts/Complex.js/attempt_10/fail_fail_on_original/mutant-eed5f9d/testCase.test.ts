import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(complex.re !== 0).toBeTruthy();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});