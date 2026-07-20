import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.im).not.toBeCloseTo(0);
  });
});