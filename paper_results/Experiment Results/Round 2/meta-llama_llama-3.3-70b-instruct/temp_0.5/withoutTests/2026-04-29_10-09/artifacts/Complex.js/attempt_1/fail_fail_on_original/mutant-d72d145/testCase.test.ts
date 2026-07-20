import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for the acsc method', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.02702931152191365, 10);
    expect(result.im).toBeCloseTo(-0.03236052560931892, 10);
  });
});