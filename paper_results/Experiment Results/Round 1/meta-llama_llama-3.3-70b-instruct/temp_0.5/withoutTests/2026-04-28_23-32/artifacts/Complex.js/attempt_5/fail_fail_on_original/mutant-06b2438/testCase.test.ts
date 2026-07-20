import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acos correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acos();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});