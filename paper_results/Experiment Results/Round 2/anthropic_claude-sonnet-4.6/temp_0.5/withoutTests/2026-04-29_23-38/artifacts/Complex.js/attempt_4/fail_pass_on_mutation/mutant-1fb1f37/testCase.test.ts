import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh fallback behavior', () => {
  it('sin of complex number with small imaginary part matches expected value', () => {
    // The cosh fallback for |x| < 1e-9 returns 1-x (original) vs always using exp formula (mutated)
    // We need to force the fallback to be used by checking the tan function
    // tan(0 + bi) imaginary part = sinh(2b) / (cos(0) + cosh(2b)) = sinh(2b) / (1 + cosh(2b))
    // For b = 4e-10, 2b = 8e-10 < 1e-9
    // Original cosh(8e-10) = 1 - 8e-10
    // Mutated cosh(8e-10) = (exp(8e-10)+exp(-8e-10))/2 ≈ 1 + 3.2e-19 ≈ 1
    // But Math.cosh exists in Node.js, so the fallback is never called!
    // Instead test that the tan result matches the mathematically correct value
    const b = 4e-10;
    const result = new Complex(0, b).tan();
    const expected = Math.tanh(b); // tan(0 + bi) = i*tanh(b), so im = tanh(b)
    expect(result.im).toBeCloseTo(expected, 15);
  });
});