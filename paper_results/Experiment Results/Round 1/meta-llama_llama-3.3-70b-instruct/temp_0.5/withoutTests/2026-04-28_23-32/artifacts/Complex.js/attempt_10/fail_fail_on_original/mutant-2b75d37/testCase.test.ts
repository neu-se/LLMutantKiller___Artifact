import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cotangent', () => {
    const complex = new Complex(1, 2);
    expect(complex.acot()).toBeDefined();
    expect(complex.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex.acot().im).toBeCloseTo(0);
  });
});