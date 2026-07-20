import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should parse complex number with plus sign and no space', () => {
    const complexNumber = new Complex('3+4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
  });

  it('should throw an error when parsing complex number with plus sign and space in mutated code', () => {
    expect(() => new Complex('3 +4i')).toThrow(SyntaxError);
  });
});