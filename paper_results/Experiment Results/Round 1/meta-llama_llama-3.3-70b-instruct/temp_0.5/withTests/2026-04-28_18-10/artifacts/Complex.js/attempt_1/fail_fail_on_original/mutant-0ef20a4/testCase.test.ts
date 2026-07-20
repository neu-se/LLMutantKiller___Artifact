import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech when the input is zero', () => {
    const complex = new Complex(0, 0);
    expect(complex.asech().toString()).toBe('Infinity');
  });
});