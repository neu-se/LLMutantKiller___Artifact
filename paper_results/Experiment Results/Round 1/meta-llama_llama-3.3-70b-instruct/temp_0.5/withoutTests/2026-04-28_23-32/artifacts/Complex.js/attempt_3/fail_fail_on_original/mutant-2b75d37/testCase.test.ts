import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cotangent', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(-0.46364760900080615);
    expect(result.im).toBeCloseTo(0);
  });
});