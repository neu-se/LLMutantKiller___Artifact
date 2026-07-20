import { Complex } from "../../../../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for a specific value', () => {
    const complex = new Complex(0.9, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(1.151292546497023, 5);
    expect(atanh.im).toBeCloseTo(0, 5);
  });
});