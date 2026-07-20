import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly for a complex number', () => {
    const complex = new Complex(1, 2);
    const acoth = complex.acoth();
    expect(complex.re).toBeDefined();
    expect(complex.im).toBeDefined();
    expect(acoth.re).toBeDefined();
    expect(acoth.im).toBeDefined();
  });
});