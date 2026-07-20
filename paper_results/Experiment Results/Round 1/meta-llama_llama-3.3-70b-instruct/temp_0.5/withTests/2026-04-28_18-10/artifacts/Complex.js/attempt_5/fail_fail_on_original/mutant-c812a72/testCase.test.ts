import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should round complex number correctly', () => {
    const complex = new Complex(1.2345, 2.3456);
    expect(() => complex.round('a')).toThrow();
  });
});