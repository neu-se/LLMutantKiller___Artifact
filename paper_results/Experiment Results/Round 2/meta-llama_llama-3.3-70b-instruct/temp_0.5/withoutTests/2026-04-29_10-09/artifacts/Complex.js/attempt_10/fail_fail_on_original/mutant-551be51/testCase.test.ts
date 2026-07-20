import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not be undefined when calling ceil on a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    const result = complex.ceil(1);
    expect(result).not.toBeUndefined();
  });
});