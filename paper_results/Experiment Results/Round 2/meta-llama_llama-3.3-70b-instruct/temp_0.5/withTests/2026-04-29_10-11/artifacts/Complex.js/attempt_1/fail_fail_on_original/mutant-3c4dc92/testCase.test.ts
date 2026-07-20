import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(2, 3);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.09604592453314465, 10);
    expect(result.im).toBeCloseTo(-0.2877822765425686, 10);
  });
});