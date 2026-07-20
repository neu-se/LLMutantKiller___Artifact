import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(1, 2);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(atanh.im).toBeCloseTo(1.1071487180510203, 10);
  });
});