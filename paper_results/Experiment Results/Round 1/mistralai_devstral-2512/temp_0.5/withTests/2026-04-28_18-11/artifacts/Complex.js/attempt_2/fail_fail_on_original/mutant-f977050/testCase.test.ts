import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should return correct real and imaginary parts for acosh(2+3i)', () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // Expected values calculated from the original implementation
    expect(result.re).toBeCloseTo(1.466337068922354, 10);
    expect(result.im).toBeCloseTo(-1.0001435424738368, 10);
  });
});