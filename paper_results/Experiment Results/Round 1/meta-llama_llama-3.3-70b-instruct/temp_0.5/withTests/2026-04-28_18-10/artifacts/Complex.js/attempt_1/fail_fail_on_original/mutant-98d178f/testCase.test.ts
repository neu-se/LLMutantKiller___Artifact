import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(2, 3);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.5493061443340549, 10);
    expect(atanh.im).toBeCloseTo(-0.17328735781587395, 10);
  });
});