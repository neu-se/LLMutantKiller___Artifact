import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle a string with a missing imaginary part in the original code', () => {
    const c = new Complex('1');
    expect(c.re).toBe(1);
    expect(c.im).toBe(0);
    const d = new Complex('1+');
    expect(() => d).toThrowError(SyntaxError);
  });
});