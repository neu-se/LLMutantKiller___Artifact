import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 0);
    const sec = complex.sec();
    expect(sec.re).toBeCloseTo(1 / Math.cos(1), 10);
    expect(sec.im).toBeCloseTo(0, 10);
  });
});