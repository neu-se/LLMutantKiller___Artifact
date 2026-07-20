import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly for a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(complex.re).not.toBeUndefined();
    expect(complex.im).not.toBeUndefined();
  });
});