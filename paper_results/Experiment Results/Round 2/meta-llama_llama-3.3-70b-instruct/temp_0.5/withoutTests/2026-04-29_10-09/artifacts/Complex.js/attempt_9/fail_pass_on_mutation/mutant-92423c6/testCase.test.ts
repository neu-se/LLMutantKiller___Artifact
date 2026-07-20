import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const taylorSeriesResult = -0.5 * x * x + 1/24 * x * x * x * x;
    expect(result.re).toBeCloseTo(taylorSeriesResult, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});