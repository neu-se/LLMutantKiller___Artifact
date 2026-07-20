import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(1, 1);
    const result = c['asec']();
    expect(result['re']).not.toBe(0);
    expect(result['im']).not.toBe(0);
  });
});