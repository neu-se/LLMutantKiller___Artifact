import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a and b are zero', () => {
    const complex = new Complex(0, 0);
    expect(complex.acoth().toString()).toBe('0 3.141592653589793i');
  });
});