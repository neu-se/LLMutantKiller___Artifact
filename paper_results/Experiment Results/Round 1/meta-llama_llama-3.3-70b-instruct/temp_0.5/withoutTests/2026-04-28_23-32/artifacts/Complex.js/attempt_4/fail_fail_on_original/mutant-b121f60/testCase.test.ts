import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse the string "1e-2.5i"', () => {
    const complex = new Complex('1e-2.5i');
    expect(complex.re).toBe(0);
    expect(complex.im).toBeCloseTo(0.00031622776601683794);
  });
});