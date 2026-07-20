import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc for very small complex numbers where d underflows to zero", () => {
    // For a = 5e-200, b = 5e-200:
    // d = a*a + b*b underflows to 0 in float64
    // Original code: im part of fallback = (b !== 0) ? -b/0 : 0 = -Infinity
    // Mutated code:  im part of fallback = (b === 0) ? -b/0 : 0 = 0
    // So original calls asin(Infinity, -Infinity), mutated calls asin(Infinity, 0)
    // These produce different results
    const a: number = 5e-200;
    const b: number = 5e-200;
    const z = new Complex(a, b);
    const result = z.acsc();

    // asin(Infinity, 0) - what mutated code would compute
    const mutatedInnerResult = new Complex(Infinity, 0).asin();
    
    // asin(Infinity, -Infinity) - what original code computes
    const originalInnerResult = new Complex(Infinity, -Infinity).asin();

    // The results must differ between original and mutated
    // Original result should NOT equal mutated result
    expect(result.im).not.toBeCloseTo(mutatedInnerResult.im, 5);
    expect(result.im).toBeCloseTo(originalInnerResult.im, 5);
  });
});