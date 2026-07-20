import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse a string and throw an error for invalid input', () => {
    const c1 = new Complex('1+2i');
    expect(c1.re).toBe(1);
    expect(c1.im).toBe(2);

    const c2 = new Complex('1-2i');
    expect(c2.re).toBe(1);
    expect(c2.im).toBe(-2);

    const c3 = new Complex('');
    expect(c3.re).toBeNaN();
    expect(c3.im).toBeNaN();

    expect(() => new Complex(null)).toThrowError(SyntaxError);
  });
});