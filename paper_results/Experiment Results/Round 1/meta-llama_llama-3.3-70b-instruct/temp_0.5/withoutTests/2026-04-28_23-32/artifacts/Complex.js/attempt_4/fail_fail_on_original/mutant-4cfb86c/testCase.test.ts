import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acotangent for a === 0 and b === 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});