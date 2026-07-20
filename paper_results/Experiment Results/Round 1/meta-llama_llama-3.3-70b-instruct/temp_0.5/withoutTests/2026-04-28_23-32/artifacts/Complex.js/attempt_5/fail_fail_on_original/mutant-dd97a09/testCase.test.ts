import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a Complex instance when calling sech', () => {
    const complex = new Complex(1, 2);
    const result = complex.sech();
    expect(result instanceof Complex).toBe(true);
  });
});