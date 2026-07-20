import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acsc correctly for zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
    expect(result.im).toBeCloseTo(Infinity, 5);
  });
});