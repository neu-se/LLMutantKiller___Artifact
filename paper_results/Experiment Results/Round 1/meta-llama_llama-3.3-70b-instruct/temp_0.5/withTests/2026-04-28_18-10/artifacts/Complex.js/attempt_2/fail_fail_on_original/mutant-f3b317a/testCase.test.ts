import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number when asec is called with 0, 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result).toEqual(new Complex(0, Infinity));
  });
});