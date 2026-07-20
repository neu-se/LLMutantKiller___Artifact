import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle complex number strings with whitespace', () => {
    const complexNumber = new Complex('3+4i');
    const complexNumberWithSpace = new Complex('3 +4i');
    expect(complexNumber.re).toBe(complexNumberWithSpace.re);
    expect(complexNumber.im).toBe(complexNumberWithSpace.im);
  });
});