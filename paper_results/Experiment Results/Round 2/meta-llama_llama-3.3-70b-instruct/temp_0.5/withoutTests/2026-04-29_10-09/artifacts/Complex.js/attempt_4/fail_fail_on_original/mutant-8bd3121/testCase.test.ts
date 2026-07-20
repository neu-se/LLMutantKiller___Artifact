import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should not throw an error when calculating acsch', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acsch()).not.toThrow();
  });
});