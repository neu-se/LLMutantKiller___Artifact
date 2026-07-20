import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError();
  });
});