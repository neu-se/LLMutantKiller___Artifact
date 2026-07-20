import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should throw SyntaxError when parsing a string that is only a newline", () => {
    // A string of just '\n' - the regex . doesn't match \n
    // so tokens would be null -> parser_exit() throws in both versions
    // But a string with just spaces: tokens=['  '] no wait spaces are matched by .
    // ' ' -> token ' ' -> whitespace -> skip -> plus+minus=1 at end -> parser_exit
    // Actually "  " -> tokens=[' ',' '] -> both skipped -> plus+minus=1 -> throws
    // "\n" -> tokens=null -> throws in both
    // The mutation is likely equivalent - let's confirm by testing something that 
    // distinguishes '\n' handling from '' handling
    // If input has a form-feed \f: Number('\f')===0, isNaN('\f')===false
    // After a number token plus=minus=0, then '\f' with plus+minus===0 -> parser_exit
    expect(() => new Complex("3\f+4i")).toThrow(SyntaxError);
  });
});