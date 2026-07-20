import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 3);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.2378675772965165, 10);
    expect(result.im).toBeCloseTo(1.0839231321779165, 10);
  });
});