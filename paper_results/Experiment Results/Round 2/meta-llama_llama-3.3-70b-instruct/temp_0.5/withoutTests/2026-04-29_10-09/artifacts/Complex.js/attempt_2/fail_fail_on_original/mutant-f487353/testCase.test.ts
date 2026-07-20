import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for csc', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    expect(csc.re).toBeCloseTo(-0.2717525853198421);
    expect(csc.im).toBeCloseTo(0.2717525853198421);
  });
});