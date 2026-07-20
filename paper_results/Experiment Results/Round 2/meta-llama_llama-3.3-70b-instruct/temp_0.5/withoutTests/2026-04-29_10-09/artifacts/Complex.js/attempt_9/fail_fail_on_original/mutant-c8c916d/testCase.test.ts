import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});