import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a real number (b === 0)", () => {
    // For a real number z = a (b === 0), acsch(a) = log(a + sqrt(a^2 + 1))
    // The original code has: if (b === 0) { return new Complex(...) }
    // The mutated code has: if (b !== 0) { return new Complex(...) }
    // So for a real input, the original returns the simple formula result,
    // but the mutated code skips that branch and uses the asinh path instead.
    
    const z = new Complex(2, 0);
    const result = z.acsch();
    
    // acsch(2) = log(2 + sqrt(4 + 1)) = log(2 + sqrt(5))
    const expected = Math.log(2 + Math.sqrt(4 + 1));
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});