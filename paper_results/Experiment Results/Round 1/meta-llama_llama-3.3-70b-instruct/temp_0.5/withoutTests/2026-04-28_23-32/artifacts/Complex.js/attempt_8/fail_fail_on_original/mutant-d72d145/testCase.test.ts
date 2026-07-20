import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acsc();
    expect(resultOriginal.re).toBeCloseTo(-0.45227844715119064, 10);
    expect(resultOriginal.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});