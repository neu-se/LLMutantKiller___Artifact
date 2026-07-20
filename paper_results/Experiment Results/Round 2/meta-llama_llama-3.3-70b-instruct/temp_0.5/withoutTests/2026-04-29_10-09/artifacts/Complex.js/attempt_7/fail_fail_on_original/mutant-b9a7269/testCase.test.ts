import { Complex } from "./complex";

describe('Complex', () => {
  it('should floor complex number correctly', () => {
    const complex = new Complex(12.3456, 7.89);
    const floored = complex.floor(2);
    expect(floored.re).toBeCloseTo(12.34);
    expect(floored.im).toBeCloseTo(7.89);
    expect(complex.floor(2).re).toBeCloseTo(12.34);
    expect(complex.floor(2).im).toBeCloseTo(7.89);
    // The mutated code changes the line to places = Math.pow(10, true);
    // This will cause an error when trying to floor with a non-numeric value
    expect(complex.floor(2).re).toBeCloseTo(12.34);
  });
});