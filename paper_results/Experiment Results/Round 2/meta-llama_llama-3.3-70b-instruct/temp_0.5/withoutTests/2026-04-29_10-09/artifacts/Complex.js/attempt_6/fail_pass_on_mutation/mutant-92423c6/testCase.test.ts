import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.00000001;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = -0.5 * x * x + 1/24 * x * x * x * x - 1/720 * x * x * x * x * x * x;
    expect(result.re).toBeCloseTo(expected, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});