import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not return undefined when calling asec on a complex number', () => {
    const complex = new Complex(2, 0);
    expect(complex.asec()).not.toBeUndefined();
  });
});