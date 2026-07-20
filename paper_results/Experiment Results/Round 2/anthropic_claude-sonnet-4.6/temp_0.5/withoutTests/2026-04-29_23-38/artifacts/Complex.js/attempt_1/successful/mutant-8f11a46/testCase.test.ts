import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should throw SyntaxError when parsing a string with consecutive operators like '++'", () => {
    // The mutation changes `if (plus + minus === 0 || isNaN(c)) { parser_exit(); }`
    // to `if (false) { parser_exit(); }`, which means invalid inputs that should
    // throw errors will no longer throw them.
    // 
    // When we have a string like '1++2', after parsing '1', plus=1, minus=0.
    // Then we see '+', plus becomes 2. Then we see '+', plus becomes 3.
    // Then we see '2' - at this point plus+minus = 3, not 0, so it's valid.
    // 
    // We need a case where plus+minus === 0 when a number token is encountered.
    // This happens when a number appears right after another number without operator.
    // e.g., '1 2' - after parsing '1', plus=minus=0, then '2' is encountered with plus+minus=0
    // 
    // In the original code, this throws SyntaxError.
    // In the mutated code, the check is `if (false)` so it never throws.
    
    expect(() => {
      new Complex('1 2');
    }).toThrow(SyntaxError);
  });
});