import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct log value for zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);
  });

  it.skip('should return correct log value for positive real number near zero', () => {
    const complex = new Complex(1e-16, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(-36.04365338923282);
    expect(result.im).toBeCloseTo(0);
  });
});