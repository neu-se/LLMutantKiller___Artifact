import { Complex } from "../../../../../../complex.js";

describe('Complex.js', () => {
  it('should return the correct acosh value', () => {
    const complex = new Complex(2, 0);
    const acoshValue = complex.acosh();
    expect(acoshValue.re).toBeCloseTo(1.3169578969248166);
    expect(acoshValue.im).toBeCloseTo(0);
  });
});