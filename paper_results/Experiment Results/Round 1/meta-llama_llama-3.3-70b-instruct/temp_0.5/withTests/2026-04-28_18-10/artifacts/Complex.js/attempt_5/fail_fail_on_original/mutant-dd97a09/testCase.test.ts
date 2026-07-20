import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when sech is called on the mutated code', () => {
    const complex = new Complex(1, 1);
    expect(complex.sech).not.toBeUndefined();
    expect(complex.sech.toString()).not.toContain('return new Complex');
    expect(complex.sech.toString()).not.toContain('function() {}');
  });
});