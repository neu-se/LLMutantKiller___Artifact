import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(100, 0);
    const result = complex.cosh();
    expect(result.re).toBeGreaterThan(1.27e43);
  });
});