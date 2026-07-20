import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly for zero', () => {
    const complex = new Complex(0, 0);
    expect(complex.acsc().re).toBeCloseTo(Math.PI / 2);
    expect(complex.acsc().im).toBeCloseTo(Infinity);
  });
});