import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complex2 = new Complex({ re: 1, im: 2 });
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(2);
  });
});