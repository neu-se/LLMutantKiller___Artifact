import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a value when asec is called with a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.toString()).not.toBe('0, Infinity');
  });
});