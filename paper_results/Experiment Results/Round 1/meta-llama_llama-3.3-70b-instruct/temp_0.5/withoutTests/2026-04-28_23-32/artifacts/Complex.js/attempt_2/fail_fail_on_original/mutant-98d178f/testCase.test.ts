import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(1, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.5493061443340548, 10);
    expect(atanh.im).toBeCloseTo(0, 10);
  });
});