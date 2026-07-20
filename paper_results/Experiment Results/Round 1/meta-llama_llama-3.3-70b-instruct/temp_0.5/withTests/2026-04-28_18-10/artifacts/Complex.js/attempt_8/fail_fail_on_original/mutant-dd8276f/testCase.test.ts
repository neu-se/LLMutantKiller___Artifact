import { Complex } from "./complex";

describe('Complex', () => {
  it('should handle acsc correctly for b === 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
    expect(result.im).toBeCloseTo(Infinity, 5);
  });

  it('should handle acsc correctly for b !== 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 5);
  });
});