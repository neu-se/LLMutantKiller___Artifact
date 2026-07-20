import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when asec is called on the original code', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.asec()).not.toThrow();
  });
});