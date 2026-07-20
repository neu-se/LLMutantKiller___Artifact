import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate asech for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrow();
  });
});