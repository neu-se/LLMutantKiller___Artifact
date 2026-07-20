import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(1, 1);
    const result = c['asec']();
    expect(result['re']).not.toBeNaN();
    expect(result['im']).not.toBeNaN();
    const originalResult = new Complex(1, 1);
    const original = originalResult['asec']();
    expect(result['re']).not.toEqual(original['re']);
    expect(result['im']).not.toEqual(original['im']);
  });
});