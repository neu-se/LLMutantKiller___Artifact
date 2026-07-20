import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and throw an error for an empty property', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(() => new Complex({ "": 1 })).toThrowError(SyntaxError);
  });
});