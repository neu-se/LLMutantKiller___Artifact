import { Complex } from "../complex";

describe('Complex', () => {
  it('should throw an error when calculating acsc of a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.acsc()).toThrowError();
  });
});