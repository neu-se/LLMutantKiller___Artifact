import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech with a real part that is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(-Infinity);
  });
});