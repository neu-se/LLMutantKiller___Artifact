import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an empty string', () => {
    expect(() => new Complex('')).toThrow(SyntaxError);
    const complex1 = new Complex('1i');
    expect(complex1.re).toBe(0);
    expect(complex1.im).toBe(1);
  });
});