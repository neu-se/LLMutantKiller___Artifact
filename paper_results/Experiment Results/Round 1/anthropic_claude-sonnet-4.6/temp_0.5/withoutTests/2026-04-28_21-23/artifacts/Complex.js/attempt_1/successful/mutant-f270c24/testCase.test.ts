import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a real number (b === 0)", () => {
    // acsch(2) = log(2 + sqrt(4 + 1)) = log(2 + sqrt(5))
    // When b === 0 (imaginary part is 0), the original code takes the real-only path
    // The mutation changes `if (b === 0)` to `if (b !== 0)`, which inverts the condition
    // This means for a real input, the original returns a simple real result
    // but the mutant would skip that branch and use the general formula instead
    
    const c = new Complex(2, 0);
    const result = c.acsch();
    
    // Expected: log(2 + sqrt(5)) ≈ 0.48121182505960344
    const expected = Math.log(2 + Math.sqrt(4 + 1));
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});