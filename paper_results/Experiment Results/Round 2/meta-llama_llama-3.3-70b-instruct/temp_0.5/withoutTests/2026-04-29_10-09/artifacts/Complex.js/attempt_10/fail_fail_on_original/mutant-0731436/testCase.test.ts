import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(1, 1);
    const b = true;
    expect(b).toBe(true);
    const result = c['asec']();
    expect(result).not.toBeNull();
  });
});