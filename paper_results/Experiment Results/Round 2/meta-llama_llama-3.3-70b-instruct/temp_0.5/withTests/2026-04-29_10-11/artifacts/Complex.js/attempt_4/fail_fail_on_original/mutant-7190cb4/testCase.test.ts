import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle complex acsc calculation correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});