import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(0, 10);
  });
});