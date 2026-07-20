import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(0.27182818284549193, 10);
    expect(result.im).toBeCloseTo(0.27182818284549193, 10);
  });
});