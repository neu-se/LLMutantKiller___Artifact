import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech with a non-zero real part', () => {
    const complex = new Complex(1, 0);
    expect(complex.asech().toString()).toBe('0, -Infinity');
  });
});