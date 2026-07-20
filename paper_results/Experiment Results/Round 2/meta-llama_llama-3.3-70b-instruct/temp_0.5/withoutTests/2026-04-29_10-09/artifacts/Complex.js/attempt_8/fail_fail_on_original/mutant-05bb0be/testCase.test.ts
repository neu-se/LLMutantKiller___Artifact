import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for a specific value', () => {
    const complex = new Complex(0.5, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.5493061443340548, 5);
    expect(atanh.im).toBeCloseTo(0, 5);
    const complex2 = new Complex(-0.5, 0);
    const atanh2 = complex2.atanh();
    expect(atanh2.re).toBeCloseTo(-0.5493061443340548, 5);
    expect(atanh2.im).toBeCloseTo(0, 5);
  });
});