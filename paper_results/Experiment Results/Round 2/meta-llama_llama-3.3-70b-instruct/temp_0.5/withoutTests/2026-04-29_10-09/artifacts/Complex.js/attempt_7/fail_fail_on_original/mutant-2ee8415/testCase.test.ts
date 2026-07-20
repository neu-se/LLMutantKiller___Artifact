import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asinh and not change the original object properties', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(c.re).toBeCloseTo(1, 10);
    expect(c.im).toBeCloseTo(2, 10);
  });
});