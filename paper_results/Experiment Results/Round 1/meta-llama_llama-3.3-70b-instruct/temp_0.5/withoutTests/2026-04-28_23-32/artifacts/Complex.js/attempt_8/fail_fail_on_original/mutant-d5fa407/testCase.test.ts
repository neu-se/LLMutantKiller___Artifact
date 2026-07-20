import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent for a specific case', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acot();
    expect(result2.im).not.toBe(0);
  });
});