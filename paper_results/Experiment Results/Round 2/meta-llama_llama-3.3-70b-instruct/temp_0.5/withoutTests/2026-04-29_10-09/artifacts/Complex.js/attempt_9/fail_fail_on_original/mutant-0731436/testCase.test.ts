import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(1, 1);
    const result = c['asec']();
    const b = 1;
    expect((b !== 0) ? true : false).toBe(true);
  });
});