import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should parse a string with a plus sign and a number', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});