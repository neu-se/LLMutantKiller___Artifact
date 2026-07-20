import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a string with a plus sign and a number', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});