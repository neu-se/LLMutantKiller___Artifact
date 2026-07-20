import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.im).not.toBeCloseTo(Infinity, 10);
  });
});