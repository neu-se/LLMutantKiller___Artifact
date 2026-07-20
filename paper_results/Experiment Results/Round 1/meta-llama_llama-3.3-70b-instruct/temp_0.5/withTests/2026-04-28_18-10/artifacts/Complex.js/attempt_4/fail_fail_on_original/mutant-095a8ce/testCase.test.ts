import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a non-zero input', () => {
    const complex = new Complex(2, 0);
    const result = complex['asec']();
    expect(result['re']).not.toBeCloseTo(0, 10);
    expect(result['im']).not.toBeCloseTo(0, 10);
  });
});