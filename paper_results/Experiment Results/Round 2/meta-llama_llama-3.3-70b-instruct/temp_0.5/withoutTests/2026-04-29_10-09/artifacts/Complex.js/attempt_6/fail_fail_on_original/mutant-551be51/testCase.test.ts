import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with the correct values when calling ceil on a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    const result = complex.ceil(1);
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(4);
  });
});