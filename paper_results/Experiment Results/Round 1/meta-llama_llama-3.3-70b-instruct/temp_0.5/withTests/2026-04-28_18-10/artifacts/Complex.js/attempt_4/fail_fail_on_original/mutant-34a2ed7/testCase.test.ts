import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should parse a string with a number', () => {
    const complex = new Complex('1');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(0);
  });
});