import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.im).toBeCloseTo(-0.8813735870195429, 10);
  });
});