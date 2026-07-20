import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should handle newline character in complex string - newline between number and i", () => {
    // Tokens for "2\ni": ['2', '\n', 'i']
    // Original: '2' sets re, '\n' skipped, 'i' → im=1... wait no
    // Actually "2\ni": '2' then '\n' then 'i'
    // Original: skip '\n', then 'i' with plus+minus=0 after '2' consumed them → parser_exit
    // Need a case where '\n' skip matters differently
    // Try: "+\ni" - tokens: ['+', '\n', 'i']  
    // Original: '+' increments plus, '\n' skipped, 'i' → im=1. Result: 0+1i
    // Mutated: '+' increments plus=1, '\n' in else: plus+minus=1, isNaN('\n')=false,
    //   next token is 'i' → im += parseFloat('\n') = NaN. plus=minus=0. Result: NaN
    const c = new Complex("+\ni");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});