import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and have a defined imaginary part', () => {
    const complex = new Complex('1+2i');
    expect(complex.im).toBeDefined();
    expect(complex.im).not.toBeNull();
    expect(complex.im).not.toBeUndefined();
  });
});