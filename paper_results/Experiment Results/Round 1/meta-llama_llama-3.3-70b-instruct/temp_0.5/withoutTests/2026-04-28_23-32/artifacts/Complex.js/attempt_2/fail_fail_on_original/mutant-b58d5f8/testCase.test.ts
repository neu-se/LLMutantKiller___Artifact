import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an invalid string', () => {
    const complex = new Complex('invalid');
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
  });
});