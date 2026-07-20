import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse the string "1e+10i"', () => {
    const complex = new Complex('1e+10i');
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(10000000000);
  });
});