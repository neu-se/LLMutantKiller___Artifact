import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Math.PI / 2);
  });
});