import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number to decimal places', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(3);
    expect(result.re).not.toBeCloseTo(2, 0);
    expect(result.im).not.toBeCloseTo(7, 0);
  });
});