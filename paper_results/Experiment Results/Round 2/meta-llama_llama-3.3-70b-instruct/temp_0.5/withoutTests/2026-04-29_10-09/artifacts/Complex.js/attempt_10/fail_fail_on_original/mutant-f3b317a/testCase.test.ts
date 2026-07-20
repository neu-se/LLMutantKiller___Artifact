import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return a complex number with re equal to 0 and im equal to Infinity when asec is called with a and b equal to 0', () => {
    const complex = new Complex(0, 0);
    const result = complex['asec']();
    expect(result['re']).toBe(0);
    expect(result['im']).toBe(Infinity);
  });
});