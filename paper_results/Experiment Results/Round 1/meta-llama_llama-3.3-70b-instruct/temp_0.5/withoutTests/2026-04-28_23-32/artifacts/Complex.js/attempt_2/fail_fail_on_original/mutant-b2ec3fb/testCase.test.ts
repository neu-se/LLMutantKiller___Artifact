import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should floor the real part correctly', () => {
    const complex = new Complex(1.2345, 6.789);
    const floored = complex.floor(2);
    expect(floored.re).toBeCloseTo(1.23);
  });
});