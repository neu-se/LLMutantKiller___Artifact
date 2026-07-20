import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate asech', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(-0.481212326, 6);
    expect(result.im).toBeCloseTo(-0.481212326, 6);
  });
});