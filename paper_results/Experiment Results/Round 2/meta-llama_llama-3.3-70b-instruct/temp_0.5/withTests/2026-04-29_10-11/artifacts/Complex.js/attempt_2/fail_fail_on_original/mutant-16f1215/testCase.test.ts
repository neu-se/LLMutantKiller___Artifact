import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});