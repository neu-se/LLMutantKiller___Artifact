import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when subtracting Infinity from Infinity', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex('Infinity');
    expect(complex1.sub(complex2).toString()).toBe('NaN');
  });
});