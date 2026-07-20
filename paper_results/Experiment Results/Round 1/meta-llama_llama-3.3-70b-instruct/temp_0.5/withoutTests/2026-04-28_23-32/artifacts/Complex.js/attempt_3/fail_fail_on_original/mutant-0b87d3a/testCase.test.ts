import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly for a specific complex number', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.046, 3);
    expect(result.im).toBeCloseTo(0.139, 3);
  });
});