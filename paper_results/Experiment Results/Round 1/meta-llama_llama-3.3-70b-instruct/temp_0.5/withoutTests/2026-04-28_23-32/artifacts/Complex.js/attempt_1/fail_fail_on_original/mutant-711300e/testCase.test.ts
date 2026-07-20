import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex class', () => {
  it('should correctly parse complex numbers from objects', () => {
    const complex = new Complex({ im: 1, foo: 'bar' });
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(1);
  });
});