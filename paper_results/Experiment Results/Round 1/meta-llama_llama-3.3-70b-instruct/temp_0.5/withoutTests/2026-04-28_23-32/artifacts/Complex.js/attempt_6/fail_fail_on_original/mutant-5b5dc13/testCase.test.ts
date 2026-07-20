import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acsch();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});