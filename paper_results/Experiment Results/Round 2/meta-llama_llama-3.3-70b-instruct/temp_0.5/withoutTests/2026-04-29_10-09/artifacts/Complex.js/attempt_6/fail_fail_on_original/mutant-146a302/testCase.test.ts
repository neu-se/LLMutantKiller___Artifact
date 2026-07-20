import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(1.0213179473554256, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});