import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when asec is called with a and b equal to 0 in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex['asec']()).toThrowError();
  });
});