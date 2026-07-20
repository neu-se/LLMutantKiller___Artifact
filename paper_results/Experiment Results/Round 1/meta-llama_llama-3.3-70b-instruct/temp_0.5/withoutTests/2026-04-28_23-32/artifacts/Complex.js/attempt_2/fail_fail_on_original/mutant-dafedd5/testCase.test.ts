import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(10.12345, 20.6789);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(10.12, 2);
    expect(result.im).toBeCloseTo(20.68, 2);
    const complex2 = new Complex(10.12345, 20.6789);
    const result2 = complex2.ceil(1);
    expect(result2.re).toBeCloseTo(11, 0);
    expect(result2.im).toBeCloseTo(21, 0);
  });
});