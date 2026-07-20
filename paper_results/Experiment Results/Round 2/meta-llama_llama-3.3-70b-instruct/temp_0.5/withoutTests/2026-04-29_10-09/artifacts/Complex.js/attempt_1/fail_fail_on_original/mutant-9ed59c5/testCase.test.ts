import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should export Complex as the default export when using CommonJS', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(Complex).toBe(require('../../../../../../../../subject_repositories/Complex.js/complex.js').default);
  });
});