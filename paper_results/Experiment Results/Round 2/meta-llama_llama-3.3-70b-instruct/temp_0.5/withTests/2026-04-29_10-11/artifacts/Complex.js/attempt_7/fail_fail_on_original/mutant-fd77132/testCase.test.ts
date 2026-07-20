import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should throw an error when calling asec on a complex number in the mutated code', () => {
    const complex = new Complex(2, 0);
    expect(() => complex.asec()).toThrowError();
  });
});