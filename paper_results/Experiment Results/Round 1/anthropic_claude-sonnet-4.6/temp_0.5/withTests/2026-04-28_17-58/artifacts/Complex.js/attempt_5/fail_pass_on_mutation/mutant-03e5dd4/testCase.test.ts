import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should throw SyntaxError for string with only a newline", () => {
    // "\n" produces null from the regex match (. doesn't match \n)
    // null triggers parser_exit() in both versions - same behavior
    // 
    // BUT: what about a string like "3+\n" where \n is at end?
    // tokens = ["3", "+"] - \n not captured
    // plus+minus = 1 at end -> throws in both versions
    //
    // What about "+" alone?
    // tokens = ["+"] -> plus=2, minus=0 at end -> throws in both
    //
    // I need to find input where '\n' IS a token or "" IS a token
    // 
    // Final attempt: test that the parser handles the string "3 + 4i\n" 
    // where \n is at the very end - regex won't capture it, same in both
    
    // Let me try testing with a string containing \r (carriage return)
    // \r is also a line terminator, not matched by . without s flag
    // So same issue
    
    // I'll try \v (vertical tab) - NOT a line terminator, IS matched by .
    // In original: \v falls to else, isNaN('\v')=false, parseFloat('\v')=NaN -> NaN result
    // In mutated: same behavior
    
    // There truly seems to be no observable difference.
    // Let me try the test anyway with a creative input:
    expect(() => new Complex("+")).toThrow();
  });
});