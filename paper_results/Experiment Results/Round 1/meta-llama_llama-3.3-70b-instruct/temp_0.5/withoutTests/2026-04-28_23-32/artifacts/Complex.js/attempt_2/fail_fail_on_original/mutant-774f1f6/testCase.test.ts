import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number when null is provided', () => {
    const complex = new Complex(null);
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});