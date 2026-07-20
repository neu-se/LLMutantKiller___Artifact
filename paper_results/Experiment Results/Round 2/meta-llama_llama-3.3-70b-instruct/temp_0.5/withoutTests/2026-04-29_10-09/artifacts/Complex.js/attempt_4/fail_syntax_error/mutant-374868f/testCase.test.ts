import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate asech for a value of 0.5', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });

  // Additional test to check for failure on mutated code
  it('should fail for asech calculation on mutated code', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBeCloseTo(0.5 * (0.5 * (0.5 * (0.5 * (0.5 * (0.5 * (0.5 * (0.5 * (0.5 * (0.5 * (0.5 * 1))))))))))
  });
});