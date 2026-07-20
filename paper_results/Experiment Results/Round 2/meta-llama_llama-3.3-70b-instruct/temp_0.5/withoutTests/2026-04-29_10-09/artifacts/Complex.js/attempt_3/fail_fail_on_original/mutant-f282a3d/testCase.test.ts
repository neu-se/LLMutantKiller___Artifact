import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers and throw an error for invalid input', () => {
    const complex1 = new Complex('1i');
    expect(complex1.re).toBe(0);
    expect(complex1.im).toBe(1);

    expect(() => new Complex('i')).toThrow(SyntaxError);
    expect(() => new Complex('')).toThrow(SyntaxError);
  });
});