import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(1, 1);
    const result = c['asec']();
    const b = 1;
    expect((b !== 0) ? -b / 0 : 0).toBeNaN();
  });
});