import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(1e-200 + 1e-200i) where d underflows to 0', () => {
    const c = new Complex(1e-200, 1e-200);
    const result = c.acsch();
    // d = (1e-200)^2 + (1e-200)^2 = 0 (underflow)
    // Original second branch: Complex(1e-200/0, -1e-200/0) = Complex(Inf, -Inf)
    // Mutated first branch: Complex(1e-200/0, -1e-200/0) = Complex(Inf, -Inf)
    // Both same - won't work
    // But let's check the actual value
    expect(result.isNaN()).toBe(false);
  });
});