import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(0, 1);
    const result = c['asec']();
    expect(result).not.toBeNull();
    expect(result['re']).not.toBeNaN();
    expect(result['im']).not.toBeNaN();
  });
});