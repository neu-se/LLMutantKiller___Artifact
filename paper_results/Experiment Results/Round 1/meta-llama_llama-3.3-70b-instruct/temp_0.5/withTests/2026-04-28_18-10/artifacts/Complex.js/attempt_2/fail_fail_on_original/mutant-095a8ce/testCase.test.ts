import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0, 10);
    expect(result['im']).toBeCloseTo(0, 10);
  });
});