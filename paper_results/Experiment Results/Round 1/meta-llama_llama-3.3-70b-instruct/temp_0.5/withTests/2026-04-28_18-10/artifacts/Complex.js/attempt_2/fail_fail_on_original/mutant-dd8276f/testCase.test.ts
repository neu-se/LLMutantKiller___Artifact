import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});