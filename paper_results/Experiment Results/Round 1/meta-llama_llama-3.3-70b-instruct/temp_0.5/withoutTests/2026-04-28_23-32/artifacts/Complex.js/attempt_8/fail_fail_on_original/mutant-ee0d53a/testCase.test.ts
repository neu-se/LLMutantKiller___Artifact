import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate abs correctly for small values', () => {
    const a = 1;
    const b = 1;
    const complex = new Complex(a, b);
    const result = complex.abs();
    const manualCalculation = Math.sqrt(a * a + b * b);
    expect(result).toBeCloseTo(manualCalculation, 10);
  });

  it('should calculate abs correctly for large values', () => {
    const a = 3001;
    const b = 1;
    const complex = new Complex(a, b);
    const result = complex.abs();
    const manualCalculation = Math.sqrt(a * a + b * b);
    expect(result).toBeCloseTo(manualCalculation, 10);
  });
});