import { Complex } from "../complex";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 5);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acsc();
    expect(result2.re).toBeCloseTo(Math.PI / 2, 5);
    expect(result2.im).toBeCloseTo(Infinity, 5);
  });
});