import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(1.8508157176809257, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0.000001, 0);
    const result2 = complex2.sec();
    expect(result2.re).toBeCloseTo(1.8508157176809257, 2);
  });
});