import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should have the correct export properties', () => {
    expect(Object.keys(Complex)).toContain('__esModule');
    expect(Complex.__esModule).toBe(true);
  });
});