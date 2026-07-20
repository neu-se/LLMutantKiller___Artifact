import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should floor complex number correctly', () => {
    const complex = new Complex(12.3456, 7.89);
    const floored = complex.floor(2);
    expect(floored.re).toBeCloseTo(12.34);
    expect(floored.im).toBeCloseTo(7.89);
    expect(complex.floor(2).re).toBeCloseTo(12.34);
    expect(complex.floor(2).im).toBeCloseTo(7.89);
  });
});