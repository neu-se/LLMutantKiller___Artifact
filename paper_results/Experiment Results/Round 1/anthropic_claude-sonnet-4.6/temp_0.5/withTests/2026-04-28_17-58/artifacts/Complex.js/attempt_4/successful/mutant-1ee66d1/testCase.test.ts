import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects mutation in acsc fallback: result should be NaN not zero when d underflows', () => {
    // With a=0, b=1e-200: d = b*b = 1e-400 which underflows to 0
    // Original fallback: Complex(0, -b/0) = Complex(0, -Inf) -> asin -> NaN (due to Inf-Inf)
    // Mutated fallback: Complex(0, -b*0) = Complex(0, 0) -> asin -> Complex(0, 0)
    const z = new Complex(0, 1e-200);
    const result = z.acsc();
    // Original gives NaN (from Inf arithmetic), mutated gives (0, 0)
    expect(result.isNaN()).toBe(true);
  });
});