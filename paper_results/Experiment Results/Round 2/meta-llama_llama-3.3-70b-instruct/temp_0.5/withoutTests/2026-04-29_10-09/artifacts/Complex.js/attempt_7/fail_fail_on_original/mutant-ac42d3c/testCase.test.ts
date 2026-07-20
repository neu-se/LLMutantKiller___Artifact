import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not be undefined when b is -1 in atan and a is 0', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result).toBeDefined();
  });
});