import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should throw an error when parsing invalid string', () => {
    const c = new Complex('1+2i3');
    expect(c.re).toBeNaN();
    expect(c.im).toBeNaN();
  });
});