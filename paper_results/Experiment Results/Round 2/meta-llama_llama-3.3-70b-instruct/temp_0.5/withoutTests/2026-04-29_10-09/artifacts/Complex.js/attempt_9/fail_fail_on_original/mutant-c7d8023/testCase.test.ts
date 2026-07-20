import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return Infinity when b is zero in acsch for original code', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Infinity, 10);
  });

  it('should not return Infinity when b is zero in acsch for mutated code', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(Infinity, 10);
  });
});