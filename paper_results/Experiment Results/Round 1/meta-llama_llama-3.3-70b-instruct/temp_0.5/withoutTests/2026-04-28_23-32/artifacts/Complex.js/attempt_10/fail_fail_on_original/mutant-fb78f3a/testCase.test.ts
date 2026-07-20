import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0, 15);
    expect(result['im']).toBeCloseTo(Infinity, 15);
    const complex2 = new Complex(1, 0);
    const result2 = complex2['asec']();
    expect(result2['re']).toBeCloseTo(0, 15);
    expect(result2['im']).toBeCloseTo(0, 15);
    const complex3 = new Complex(0, 1);
    const result3 = complex3['asec']();
    expect(result3['re']).toBeCloseTo(Math.PI / 2, 15);
    expect(result3['im']).toBeCloseTo(0, 15);
    const complex4 = new Complex(1, 1);
    const result4 = complex4['asec']();
    expect(result4['re']).not.toBeCloseTo(0, 15);
  });
});