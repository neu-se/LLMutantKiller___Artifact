import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct log value for a small positive real number', () => {
    const complex = new Complex(1e-9, 0);
    const result = complex.log();
    expect(result.re).toBeGreaterThan(-36.04365338923282);
  });
});