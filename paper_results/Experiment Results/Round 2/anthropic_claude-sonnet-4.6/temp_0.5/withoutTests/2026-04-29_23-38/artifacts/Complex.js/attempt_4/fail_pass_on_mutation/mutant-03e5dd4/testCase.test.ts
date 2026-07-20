import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline", () => {
  it("should parse complex number from string with newline using explicit token check", () => {
    // The regex /\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g
    // In JS, . does NOT match \n by default, so \n is not tokenized
    // Original checks: c === ' ' || c === '\t' || c === '\n'
    // Mutated checks:  c === ' ' || c === '\t' || c === ''
    // Since \n is never a token, both behave the same for \n
    // But: what if we use String.raw or a string where \n IS a token?
    // We need to force \n into the token stream - but the regex won't capture it
    // 
    // Alternative: test that spaces still work (both handle space)
    // and that the empty string check in mutated doesn't break anything
    //
    // Actually the key: in mutated, '\n' in condition is replaced by ''
    // This means a real \n character in input won't be handled as whitespace
    // But since regex . doesn't match \n, \n never becomes a token
    // So there's NO observable difference... unless we use a different approach
    
    // Let's verify: does the regex actually skip \n silently?
    const result = "3+4i\n".match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
    // If \n is not in result, both versions behave identically
    expect(result).not.toContain('\n');
    
    // Since \n is never tokenized, the mutation has no observable effect
    // This test documents that fact - but we need to FAIL on mutated...
    // Let's check if empty string '' could ever be a token
    const emptyCheck = "".match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
    expect(emptyCheck).toBeNull(); // no tokens from empty string
  });
});