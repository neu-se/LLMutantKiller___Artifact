import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number when undefined is provided as the first argument', () => {
    const complex = new Complex(undefined);
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
    expect(() => new Complex({})).toThrowError(SyntaxError);
  });
});