import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
    expect(result.im).toBeCloseTo(Infinity, 5);
  });
});