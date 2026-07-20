import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 5);
    expect(result.im).toBeCloseTo(-0.6217761834317134, 5);
  });
});