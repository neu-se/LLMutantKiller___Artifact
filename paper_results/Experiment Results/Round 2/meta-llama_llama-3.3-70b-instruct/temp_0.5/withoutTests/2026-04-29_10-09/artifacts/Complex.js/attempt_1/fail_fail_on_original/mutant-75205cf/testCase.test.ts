import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return infinity when subtracting infinity from infinity', () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result.isInfinite()).toBe(true);
  });
});