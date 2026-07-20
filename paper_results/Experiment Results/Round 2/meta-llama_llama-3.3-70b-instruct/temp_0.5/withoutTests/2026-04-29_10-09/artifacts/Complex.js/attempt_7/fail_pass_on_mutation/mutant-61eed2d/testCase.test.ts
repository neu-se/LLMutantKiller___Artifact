import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and have the correct keys', () => {
    const complex = new Complex('1+2i');
    const keys = Object.keys(complex);
    expect(keys).toContain('re');
    expect(keys).toContain('im');
    expect(keys.length).toBe(2);
  });
});