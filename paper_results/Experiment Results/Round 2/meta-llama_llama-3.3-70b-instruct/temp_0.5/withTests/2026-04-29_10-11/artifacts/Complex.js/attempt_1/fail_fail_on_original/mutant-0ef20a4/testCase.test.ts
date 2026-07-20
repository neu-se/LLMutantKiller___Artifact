import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when calculating asech of zero', () => {
    const complex = new Complex(0, 0);
    expect(complex.asech().toString()).toBe('Infinity');
  });
});