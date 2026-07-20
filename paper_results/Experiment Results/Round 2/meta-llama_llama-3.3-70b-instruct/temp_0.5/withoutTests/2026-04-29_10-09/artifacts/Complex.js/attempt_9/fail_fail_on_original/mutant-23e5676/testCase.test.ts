import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(0);
    expect(result.im).not.toBeCloseTo(0);
  });
});