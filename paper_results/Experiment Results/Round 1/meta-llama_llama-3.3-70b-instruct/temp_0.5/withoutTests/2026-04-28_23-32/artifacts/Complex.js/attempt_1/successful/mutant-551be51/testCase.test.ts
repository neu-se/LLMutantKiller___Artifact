import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly implement the ceil function', () => {
    const complex = new Complex(1.5, 2.7);
    const result = complex.ceil();
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});