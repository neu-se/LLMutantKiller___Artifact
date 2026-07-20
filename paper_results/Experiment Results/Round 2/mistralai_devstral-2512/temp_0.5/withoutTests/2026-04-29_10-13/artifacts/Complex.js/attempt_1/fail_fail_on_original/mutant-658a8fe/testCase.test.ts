import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch function', () => {
  it('should correctly compute acsch for complex numbers with non-zero components', () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.4306, 4);
    expect(result.im).toBeCloseTo(-0.8157, 4);
  });
});