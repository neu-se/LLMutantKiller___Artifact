import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers with "i" suffix and reject empty string suffix', () => {
    const complex1 = new Complex('1+2i');
    expect(complex1.re).toBe(1);
    expect(complex1.im).toBe(2);
    expect(() => new Complex('1+')).toThrow(SyntaxError);
  });
});