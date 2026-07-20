import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b !== 0 and detect mutation', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    expect(complex.acot().im).not.toBeCloseTo(0, 10);
  });
});