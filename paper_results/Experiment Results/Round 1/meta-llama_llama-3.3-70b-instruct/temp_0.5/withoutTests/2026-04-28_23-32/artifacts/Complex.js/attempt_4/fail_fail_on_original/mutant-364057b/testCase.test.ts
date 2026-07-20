import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech for a non-zero real value', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).not.toBeCloseTo(Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});