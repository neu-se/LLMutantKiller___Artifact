import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atan for specific inputs', () => {
    const complex1 = new Complex(0, 1);
    const result1 = complex1.atan();
    const complex2 = new Complex(0, 0);
    const result2 = complex2.atan();
    expect(result1.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result2.re).toBeCloseTo(0, 10);
    const complex3 = new Complex(0, -1);
    const result3 = complex3.atan();
    expect(result3.re).toBeCloseTo(-Math.PI / 2, 10);
  });
});