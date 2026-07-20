import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse NaN handling", () => {
  it("should not throw and produce NaN result when only re component is NaN", () => {
    // Original: if (isNaN(re) || isNaN(im)) { // don't throw }
    // This means: when either is NaN, skip the parser_exit() call
    // Mutated: if (isNaN(re) && isNaN(im)) { // don't throw }
    // This means: only when BOTH are NaN, skip parser_exit()
    // So with only re=NaN, original skips throw but mutant throws
    
    // Use string parsing that results in only one NaN component
    // Parse a number to get a valid complex, then create with one NaN
    let result: any;
    expect(() => {
      result = new Complex(NaN, 5);
    }).not.toThrow();
    
    expect(result).toBeDefined();
    expect(isNaN(result['re'])).toBe(true);
  });
});