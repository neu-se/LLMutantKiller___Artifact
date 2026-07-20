import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    const expected = new Complex(0.5493061443340548, -0.5493061443340548);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});