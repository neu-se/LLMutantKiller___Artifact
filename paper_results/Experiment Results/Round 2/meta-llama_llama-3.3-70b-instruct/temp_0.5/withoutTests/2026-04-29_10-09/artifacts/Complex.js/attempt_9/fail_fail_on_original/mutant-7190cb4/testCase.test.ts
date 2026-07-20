import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a specific case', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    const complex2 = new Complex(0, -1);
    const result2 = complex2.acsc();
    expect(result.im).not.toBeCloseTo(result2.im, 10);
  });
});