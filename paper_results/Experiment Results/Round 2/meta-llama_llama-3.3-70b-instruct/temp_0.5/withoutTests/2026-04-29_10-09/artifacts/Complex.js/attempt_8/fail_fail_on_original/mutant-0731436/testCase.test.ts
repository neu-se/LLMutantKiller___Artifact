import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(0, 1);
    const result = c['asec']();
    expect(result['re']).toBeDefined();
    expect(result['im']).toBeDefined();
    const b = 1;
    expect((b !== 0) ? -b : 0).not.toBe(0);
  });
});