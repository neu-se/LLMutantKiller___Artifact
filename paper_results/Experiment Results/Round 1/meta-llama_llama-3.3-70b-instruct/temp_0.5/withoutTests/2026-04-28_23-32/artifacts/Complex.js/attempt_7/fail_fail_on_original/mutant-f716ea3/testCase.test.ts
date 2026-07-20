import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const complex = new Complex(1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.9504878943147373);
    expect(result.im).toBeCloseTo(0);
  });
});