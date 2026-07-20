import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle sinh correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.sinh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});