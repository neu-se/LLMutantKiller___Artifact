import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});