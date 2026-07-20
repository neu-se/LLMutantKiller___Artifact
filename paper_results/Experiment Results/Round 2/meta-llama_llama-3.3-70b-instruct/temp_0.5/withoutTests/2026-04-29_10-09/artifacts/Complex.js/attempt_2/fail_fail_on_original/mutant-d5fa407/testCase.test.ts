import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b !== 0', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});