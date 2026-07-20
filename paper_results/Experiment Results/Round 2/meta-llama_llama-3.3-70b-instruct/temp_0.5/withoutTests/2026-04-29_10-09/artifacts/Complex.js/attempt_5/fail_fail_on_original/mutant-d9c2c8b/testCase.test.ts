import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    const expected = new Complex(0.5493061443340548, 0);
    expect(result.toString()).toBe(expected.toString());
  });
});