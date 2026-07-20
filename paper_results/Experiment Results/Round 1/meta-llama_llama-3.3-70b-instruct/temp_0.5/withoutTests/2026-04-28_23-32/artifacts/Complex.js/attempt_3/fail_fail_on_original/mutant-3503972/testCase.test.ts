import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsch correctly', () => {
    const c = new Complex(0, 1);
    const resultOriginal = c.acsch();
    const cMutated = new Complex(0, 1);
    const resultMutated = cMutated.acsch();
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});