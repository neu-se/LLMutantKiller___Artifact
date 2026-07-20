import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(0, 0);
    const result = complex['asec']();
    expect(() => result['asec']()).toThrow();
  });
});