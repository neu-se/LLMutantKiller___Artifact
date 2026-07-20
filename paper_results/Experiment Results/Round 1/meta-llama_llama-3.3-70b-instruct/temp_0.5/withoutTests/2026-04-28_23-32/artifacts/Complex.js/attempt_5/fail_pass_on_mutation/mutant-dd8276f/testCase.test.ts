import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(1, 1);
    const complex2 = new Complex(0, 1);
    expect(complex.acsc().re).not.toBe(complex2.acsc().re);
  });
});