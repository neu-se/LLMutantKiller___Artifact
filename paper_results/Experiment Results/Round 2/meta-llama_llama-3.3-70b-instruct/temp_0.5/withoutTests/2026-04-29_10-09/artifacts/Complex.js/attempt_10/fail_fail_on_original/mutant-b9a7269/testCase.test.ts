import { Complex } from "../complex";

describe('Complex', () => {
  it('should floor complex number correctly', () => {
    const complex = new Complex(12.3456, 7.89);
    expect(complex.floor(2).re).toBeCloseTo(12.34);
    expect(complex.floor(2).im).toBeCloseTo(7.89);
    expect(complex.floor(3).re).toBeCloseTo(12.345);
    expect(complex.floor(3).im).toBeCloseTo(7.889);
  });
});