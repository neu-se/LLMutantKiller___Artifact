import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle whitespace in complex number strings', () => {
    const complexNumber = new Complex('3 + 4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
  });
});