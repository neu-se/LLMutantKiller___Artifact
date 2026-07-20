import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0.9272952180016122, 10);
    expect(result.im).toBeCloseTo(-0.9272952180016122, 10);
  });
});