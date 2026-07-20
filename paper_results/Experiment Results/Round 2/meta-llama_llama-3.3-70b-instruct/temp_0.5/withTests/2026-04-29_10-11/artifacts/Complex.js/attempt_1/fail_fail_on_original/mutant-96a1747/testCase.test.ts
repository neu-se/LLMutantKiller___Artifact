import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(1.1, 0.5);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.9501821192326173, 5);
    expect(atanh.im).toBeCloseTo(0.2553419470789307, 5);
  });
});