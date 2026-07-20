import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 3);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.25534194740679357);
    expect(result.im).toBeCloseTo(-0.04657386284338361);
  });
});