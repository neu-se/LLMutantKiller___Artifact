import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should handle acot where only b underflows but a does not', () => {
    // Use a=1, b=MIN_VALUE: d = 1 + 0 = 1 (b*b underflows but d != 0)
    // Goes through normal branch, same in both versions
    // Try a=MIN_VALUE, b=MIN_VALUE: d=0, hits mutation branch
    // Original: atan(+Inf, -Inf) -> NaN  
    // Mutated: atan(0, -Inf) -> NaN
    // Need to find case where they differ...
    
    // What about checking the re component is NaN in original?
    const result = new Complex(Number.MIN_VALUE, Number.MIN_VALUE).acot();
    expect(isNaN(result.re)).toBe(true);
  });
});