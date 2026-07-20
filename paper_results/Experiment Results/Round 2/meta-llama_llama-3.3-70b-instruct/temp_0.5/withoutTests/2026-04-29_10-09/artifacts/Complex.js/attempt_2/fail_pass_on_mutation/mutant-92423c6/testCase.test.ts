import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.0001;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    expect(result.re).toBeCloseTo(-0.5 * x * x, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});