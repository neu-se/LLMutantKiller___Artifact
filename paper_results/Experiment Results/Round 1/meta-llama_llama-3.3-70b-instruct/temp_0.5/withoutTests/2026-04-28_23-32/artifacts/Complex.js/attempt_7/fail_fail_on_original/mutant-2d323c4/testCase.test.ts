import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle division by zero in acsch', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrow();
  });
});