import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should create a complex number with the correct imaginary part when parsing a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.im).toBe(2);
  });
});