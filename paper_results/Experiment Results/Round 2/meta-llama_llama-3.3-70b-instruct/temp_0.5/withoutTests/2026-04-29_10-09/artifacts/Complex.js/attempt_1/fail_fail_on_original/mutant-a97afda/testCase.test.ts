import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atan correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0.6156268602739748, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});