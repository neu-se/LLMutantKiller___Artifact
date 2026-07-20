import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh for a = -1', () => {
    const complex = new Complex(-1, 0);
    expect(() => complex.atanh()).toThrow();
  });
});