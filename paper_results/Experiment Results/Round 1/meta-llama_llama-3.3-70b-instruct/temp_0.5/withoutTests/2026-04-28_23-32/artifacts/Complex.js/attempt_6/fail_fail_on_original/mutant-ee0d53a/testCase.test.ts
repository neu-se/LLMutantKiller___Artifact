import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate abs correctly', () => {
    const a = 3001;
    const b = 1;
    const complex = new Complex(a, b);
    const result = complex.abs();
    const manualCalculation = Math.sqrt(a * a + b * b);
    expect(result).toBeCloseTo(manualCalculation, 10);
  });
});