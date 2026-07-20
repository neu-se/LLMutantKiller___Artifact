import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const complex = new Complex(1, -1);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(-0.6366197723675814, 10);
  });
});