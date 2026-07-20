import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acotangent for a !== 0 and b === 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});