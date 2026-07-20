import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should have a default property', () => {
    expect(Object.keys(Complex)).toContain('default');
  });
});