import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the arcus secant of a complex number correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 6);
    expect(result.im).toBeCloseTo(Infinity, 6);
  });
});