import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const taylorSeriesResult = 1 - Math.cos(x);
    const difference = Math.abs(taylorSeriesResult - result.re);
    expect(difference).toBeLessThan(1e-12);
  });
});