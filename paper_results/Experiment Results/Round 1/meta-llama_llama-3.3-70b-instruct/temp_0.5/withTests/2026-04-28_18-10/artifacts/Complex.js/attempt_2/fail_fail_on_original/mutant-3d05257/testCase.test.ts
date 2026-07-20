import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.061275, 4);
    expect(result.im).toBeCloseTo(0.868578, 4);
  });
});