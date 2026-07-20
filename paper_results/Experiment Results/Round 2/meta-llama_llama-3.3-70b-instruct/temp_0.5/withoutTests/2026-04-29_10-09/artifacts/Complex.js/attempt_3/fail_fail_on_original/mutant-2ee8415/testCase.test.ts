import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(1.4436354751788104, 10);
    expect(result.im).toBeCloseTo(1.2658226177074273, 10);
    expect(c.re).toBeCloseTo(1, 10);
    expect(c.im).toBeCloseTo(2, 10);
  });
});