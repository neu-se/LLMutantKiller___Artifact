import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct acsc value for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.toString()).not.toBe("NaN");
  });
});