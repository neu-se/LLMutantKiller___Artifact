import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-Math.PI / 2, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});