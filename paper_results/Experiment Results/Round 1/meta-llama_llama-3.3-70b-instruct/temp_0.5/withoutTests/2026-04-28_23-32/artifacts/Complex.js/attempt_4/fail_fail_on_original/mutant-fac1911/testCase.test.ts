import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for non-zero complex numbers and fail for mutated code', () => {
    const complex = new Complex(1, 0);
    const acsch = complex.acsch();
    expect(acsch.re).toBeCloseTo(-0.481, 3);
    expect(acsch.im).toBeCloseTo(0, 3);
  });
});