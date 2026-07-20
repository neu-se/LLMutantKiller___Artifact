import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0.5235987755982988, 10);
    expect(result.im).toBeCloseTo(0, 10);
    // Additional assertion to ensure the mutation is detected
    expect(complex.asec().re).not.toBeCloseTo(complex.asec().re * 2, 10);
  });
});