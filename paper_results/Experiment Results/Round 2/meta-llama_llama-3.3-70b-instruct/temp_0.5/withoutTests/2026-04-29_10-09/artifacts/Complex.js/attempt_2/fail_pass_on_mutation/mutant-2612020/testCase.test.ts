import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly parse a complex number from a string and maintain object properties', () => {
    const complex = new Complex('1+2i');
    expect(complex).toHaveProperty('re');
    expect(complex).toHaveProperty('im');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});