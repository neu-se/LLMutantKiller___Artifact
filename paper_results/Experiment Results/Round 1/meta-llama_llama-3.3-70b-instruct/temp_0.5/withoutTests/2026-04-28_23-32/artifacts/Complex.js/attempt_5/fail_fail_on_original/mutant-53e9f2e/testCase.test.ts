import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.273, 3);
    expect(result.im).toBeCloseTo(-0.705, 3);
  });
});