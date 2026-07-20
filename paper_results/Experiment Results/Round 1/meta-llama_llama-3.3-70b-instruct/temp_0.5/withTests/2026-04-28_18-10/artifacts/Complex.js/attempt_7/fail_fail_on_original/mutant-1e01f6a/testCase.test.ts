import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers greater than 1 and less than -1', () => {
    const complex1 = new Complex(2, 0);
    const result1 = complex1.atanh();
    expect(result1.im).toBeCloseTo(0);

    const complex2 = new Complex(-2, 0);
    const result2 = complex2.atanh();
    expect(result2.im).toBeCloseTo(Math.PI);
  });
});