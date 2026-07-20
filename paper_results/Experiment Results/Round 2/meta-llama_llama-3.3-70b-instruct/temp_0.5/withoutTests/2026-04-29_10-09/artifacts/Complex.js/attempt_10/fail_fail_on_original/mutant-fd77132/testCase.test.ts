import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when asec method is called on mutated code', () => {
    const complex = new Complex(1, 1);
    expect(() => complex['asec']()).toThrowError();
  });
});