import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should have a property named Complex', () => {
    expect(Object.keys(Complex)).toContain('Complex');
    expect(Complex['Complex']).toBe(Complex);
  });
});