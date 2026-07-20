import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct acsc value for a specific complex number', () => {
    const complex = new Complex(1, 0);
    const acsc = complex.acsc();
    expect(acsc.toString()).toBe("1.5707963267948966");
  });
});