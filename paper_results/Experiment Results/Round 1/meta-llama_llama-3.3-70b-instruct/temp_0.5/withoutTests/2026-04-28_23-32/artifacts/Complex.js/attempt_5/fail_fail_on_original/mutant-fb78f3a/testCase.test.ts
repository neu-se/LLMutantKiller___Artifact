import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0, 15);
    expect(result['im']).toBeCloseTo(Infinity, 15);
  });
});