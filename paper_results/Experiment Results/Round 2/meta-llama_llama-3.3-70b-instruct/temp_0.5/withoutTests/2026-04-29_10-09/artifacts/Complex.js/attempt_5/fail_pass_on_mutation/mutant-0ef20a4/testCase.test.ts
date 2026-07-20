import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech for a value less than 1', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBe(Infinity);
  });
});