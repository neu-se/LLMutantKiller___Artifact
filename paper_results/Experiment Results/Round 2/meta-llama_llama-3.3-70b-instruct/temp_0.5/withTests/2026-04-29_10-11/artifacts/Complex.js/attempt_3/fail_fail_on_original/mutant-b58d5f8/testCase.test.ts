import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a null string', () => {
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});