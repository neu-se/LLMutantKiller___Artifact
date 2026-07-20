import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calculating asech for a complex number with non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    expect(() => complex.asech()).toThrow();
  });
});