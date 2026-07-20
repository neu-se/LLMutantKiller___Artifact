import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    const result = complex.ceil(1);
    expect(result.re).toBe(1.3);
    expect(result.im).toBe(3.4);
  });
});