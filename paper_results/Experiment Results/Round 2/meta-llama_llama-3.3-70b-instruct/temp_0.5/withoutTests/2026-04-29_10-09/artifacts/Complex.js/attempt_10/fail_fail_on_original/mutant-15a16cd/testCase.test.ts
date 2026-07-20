import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number to decimal places', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(Math.ceil(1.2345) / 100, 0.01);
    expect(result.im).toBeCloseTo(Math.ceil(6.789) / 100, 0.01);
  });
});