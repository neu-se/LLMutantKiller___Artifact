import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when b is 1 in atan', () => {
    const complex = new Complex(0, 1);
    expect(() => complex.atan()).toThrow();
  });
});