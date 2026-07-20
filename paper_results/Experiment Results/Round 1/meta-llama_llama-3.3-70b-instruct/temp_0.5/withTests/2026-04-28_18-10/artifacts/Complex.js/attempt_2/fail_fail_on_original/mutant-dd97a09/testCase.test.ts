import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when sech is called with no implementation', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.sech()).toThrowError();
  });
});