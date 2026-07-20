import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not return the same result for acoth when a is 0 and b is 0 as when a is not 0 and b is not 0', () => {
    const complex1 = new Complex(0, 0);
    const complex2 = new Complex(1, 1);
    expect(complex1.acoth().toString()).not.toBe(complex2.acoth().toString());
  });
});