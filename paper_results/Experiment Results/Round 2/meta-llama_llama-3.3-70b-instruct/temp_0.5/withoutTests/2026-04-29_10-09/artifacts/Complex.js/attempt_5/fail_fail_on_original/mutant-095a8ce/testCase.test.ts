import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when input is a finite complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Infinity);
    expect(result.re).toBeCloseTo(0.5880026035475675, 5);
    expect(result.im).toBeCloseTo(-0.3649650808698226, 5);
  });
});