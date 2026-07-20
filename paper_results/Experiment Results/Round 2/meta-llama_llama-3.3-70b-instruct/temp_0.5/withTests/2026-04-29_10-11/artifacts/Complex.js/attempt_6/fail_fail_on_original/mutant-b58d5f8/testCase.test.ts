import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a null string in the original code but not in the mutated code', () => {
    expect(() => {
      const c = new Complex(null);
      if (c.re !== 0 || c.im !== 0) {
        throw new Error('Error: parsing null string did not result in zero values');
      }
    }).not.toThrow();
  });
});