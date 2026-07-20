import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when parsing complex numbers with "i" suffix and should throw an error when parsing complex numbers with empty string suffix in the mutated code', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(() => new Complex('1+')).not.toThrow(SyntaxError);
  });
});