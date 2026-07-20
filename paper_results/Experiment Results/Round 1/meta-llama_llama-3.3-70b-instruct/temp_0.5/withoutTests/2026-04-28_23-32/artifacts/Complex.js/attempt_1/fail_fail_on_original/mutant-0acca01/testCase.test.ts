import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.267949192, 5);
    expect(result.im).toBeCloseTo(-0.0465739, 5);
  });
});