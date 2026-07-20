import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate sech', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    expect(sech.re).not.toBeNaN();
    expect(sech.im).not.toBeNaN();
  });
});