import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.toString()).not.toContain('NaN');
  });
});