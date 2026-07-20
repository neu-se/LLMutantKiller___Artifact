import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 3);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.14788784242365076, 10);
    expect(result.im).toBeCloseTo(-0.3617879442200245, 10);
  });
});