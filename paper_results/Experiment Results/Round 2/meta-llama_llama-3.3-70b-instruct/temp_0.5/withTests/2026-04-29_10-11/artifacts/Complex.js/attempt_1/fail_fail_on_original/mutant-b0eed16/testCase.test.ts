import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const c = new Complex(Math.PI / 4, 0);
    const result = c.sec();
    expect(result.re).toBeCloseTo(1.4142135623730951, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});