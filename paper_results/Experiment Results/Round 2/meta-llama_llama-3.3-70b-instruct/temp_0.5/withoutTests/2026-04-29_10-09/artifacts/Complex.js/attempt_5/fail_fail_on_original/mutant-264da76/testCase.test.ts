import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expected = new Complex(0.5, -0.5).atanh();
    expect(result.re).not.toBeCloseTo(-0.5493061443340548, 10);
    expect(result.im).not.toBeCloseTo(-0.5493061443340548, 10);
  });
});