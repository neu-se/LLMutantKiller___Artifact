import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const a = complex.re;
    const b = complex.im;
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(a / (a * a + b * b), 10);
    expect(result.im).toBeCloseTo(-b / (a * a + b * b), 10);
  });
});