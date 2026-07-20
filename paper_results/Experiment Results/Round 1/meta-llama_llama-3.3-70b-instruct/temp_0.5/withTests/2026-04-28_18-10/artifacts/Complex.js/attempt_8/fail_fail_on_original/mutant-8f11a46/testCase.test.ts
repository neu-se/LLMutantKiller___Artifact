import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should throw an error when parsing an invalid string', () => {
    const complexNumber = new Complex('1+a');
    expect(complexNumber.re).toBeNaN();
    expect(complexNumber.im).toBeNaN();
  });
});