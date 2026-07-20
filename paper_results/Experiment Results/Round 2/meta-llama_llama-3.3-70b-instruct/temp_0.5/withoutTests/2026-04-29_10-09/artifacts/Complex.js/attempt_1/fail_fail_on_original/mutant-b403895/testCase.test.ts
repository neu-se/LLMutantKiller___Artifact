import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex['asec']();
    expect(result['re']).toBe(Infinity);
    expect(result['im']).toBe(0);
  });
});