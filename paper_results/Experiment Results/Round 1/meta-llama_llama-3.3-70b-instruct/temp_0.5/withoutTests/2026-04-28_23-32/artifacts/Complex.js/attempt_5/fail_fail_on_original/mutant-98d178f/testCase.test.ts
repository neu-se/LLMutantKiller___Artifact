import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(0.5, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.5493061443340548, 10);
    expect(atanh.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(1, 0);
    const atanh2 = complex2.atanh();
    expect(atanh2.re).toBeCloseTo(0.5493061443340548, 10);
    expect(atanh2.im).toBeCloseTo(0, 10);
  });
});