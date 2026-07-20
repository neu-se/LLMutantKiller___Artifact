import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('1+i');
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);
  });
});