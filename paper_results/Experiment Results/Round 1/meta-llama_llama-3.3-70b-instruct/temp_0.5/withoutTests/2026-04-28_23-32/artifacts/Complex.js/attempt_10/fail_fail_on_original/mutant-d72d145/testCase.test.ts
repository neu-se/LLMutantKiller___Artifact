import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1e-16, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-1.5707963267948966, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});