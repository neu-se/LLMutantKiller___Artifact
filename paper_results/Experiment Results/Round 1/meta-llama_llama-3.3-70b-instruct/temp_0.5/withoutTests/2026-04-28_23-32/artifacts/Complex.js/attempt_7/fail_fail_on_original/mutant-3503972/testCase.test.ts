import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsch correctly', () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.im).toBeCloseTo(-Infinity, 10);
    const c2 = new Complex(0, -1);
    const result2 = c2.acsch();
    expect(result2.im).toBeCloseTo(Infinity, 10);
    expect(result.im).not.toBeCloseTo(result2.im, 10);
  });
});