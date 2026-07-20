import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should export the Complex class when using CommonJS', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(typeof module.exports).toBe('object');
    expect(module.exports).toHaveProperty('Complex');
  });
});