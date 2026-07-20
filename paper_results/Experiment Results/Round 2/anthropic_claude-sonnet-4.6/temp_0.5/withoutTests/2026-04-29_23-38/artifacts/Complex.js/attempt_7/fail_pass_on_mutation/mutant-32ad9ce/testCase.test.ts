import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse", () => {
  it("should correctly identify NaN complex created from object with one NaN component", () => {
    // {re: NaN, im: 0}: only re is NaN
    // Original ||: isNaN(NaN)||isNaN(0) = true -> enters if block
    // Mutated &&: isNaN(NaN)&&isNaN(0) = false -> does NOT enter if block
    // If the if block contains 'return z' and after the block there's parser_exit:
    // Original: returns z with re=NaN, im=0
    // Mutated: calls parser_exit -> throws SyntaxError
    
    // So: original does NOT throw, mutant DOES throw
    // Test expects no throw -> passes on original, fails on mutant
    
    const c = new Complex({ re: NaN, im: 0 });
    expect(c['re']).toBeNaN();
    expect(c['im']).toBe(0);
  });
});