import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a complex number string containing a newline character without throwing", () => {
    // Original: '\n' is treated as whitespace and skipped in token processing
    // Mutated: '\n' is NOT treated as whitespace (replaced by "" check)
    // If '\n' appears as a token and is not whitespace, it hits the else branch
    // isNaN('\n') === false (Number('\n') === 0), so it would be parsed as 0
    // This would corrupt the result in the mutated version
    
    // Force a scenario where \n behavior matters
    // "1\n" - if \n is tokenized: original skips it (plus=1, minus=0 -> stack check fails -> throws)
    // Wait, plus starts at 1, so "1\n" -> tokens ["1"] (if \n not captured) -> re=1, im=0 -> valid
    
    // Let's try "1\n+2i":
    // If \n not captured: tokens = ["1", "+", "2", "i"] -> re=1, im=2 -> valid in both
    // If \n IS captured: 
    //   Original: ["1", "\n", "+", "2", "i"] -> \n skipped -> re=1, im=2 -> valid
    //   Mutated:  ["1", "\n", "+", "2", "i"] -> \n not skipped -> isNaN('\n')=false -> re+=0, plus=0 -> then "+" increments plus -> re=1, im=2
    //   Hmm, still might work...
    
    // Actually in mutated, '\n' hits else: plus+minus must be > 0 (it is, plus=1), isNaN('\n')=false
    // tokens[i+1] is '+', not 'i', so re += parseFloat(''+'\n') = 0, plus=minus=0
    // Then '+' increments plus to 1, then '2' with next='i' -> im += 2, plus=0
    // Result: re=0+0=0? No wait, re starts at 0, then += parseFloat('\n') = 0... 
    // Hmm, but the original "1" token sets re=1 first, then \n would add 0 to re=1
    // So re=1 in both? Let me recalculate...
    
    // Original tokens for "1\n+2i" (if \n captured): ["1", "\n", "+", "2", "i"]
    // i=0: c="1", next="\n" (not 'i'), re += 1, plus=minus=0
    // i=1: c="\n", original skips (whitespace), mutated: plus+minus=0 -> parser_exit!
    
    // YES! In mutated code, after processing "1" (which resets plus=minus=0),
    // "\n" hits else branch with plus+minus===0 -> parser_exit() -> throws!
    
    // So the test is: "1\n+2i" should parse successfully in original but throw in mutated
    // IF \n is captured as a token
    
    const result = new Complex("1\n+2i");
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);
  });
});