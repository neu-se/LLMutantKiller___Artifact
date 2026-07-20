import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number from an object', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});