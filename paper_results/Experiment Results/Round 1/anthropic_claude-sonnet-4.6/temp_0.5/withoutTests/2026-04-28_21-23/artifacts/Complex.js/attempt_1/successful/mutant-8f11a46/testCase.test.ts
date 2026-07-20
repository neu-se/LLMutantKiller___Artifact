import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing - invalid input detection", () => {
  it("should throw a SyntaxError when parsing a string with consecutive operators like '++'", () => {
    // The mutation changes `if (plus + minus === 0 || isNaN(c)) {` to `if (false) {`
    // This means the parser_exit() call inside that block is never reached,
    // so invalid strings that should throw will instead produce wrong results.
    // 
    // When we have a string like '1++2', after seeing '1', plus=1, minus=0,
    // then '+' increments plus to 2, then '+' increments plus to 3,
    // then '2' is a number token. With original code: plus+minus=3 !== 0, so no exit.
    // 
    // A better case: a string starting with a number where plus+minus===0 initially
    // Actually, at the start: plus=1, minus=0, so plus+minus=1 !== 0 for the first number.
    //
    // Let's think about when plus+minus===0: after processing 'i' or a number, 
    // plus=minus=0 is set. Then if another number appears without an operator, 
    // plus+minus===0 and parser_exit() should be called.
    //
    // Example: '1 2' - after parsing '1', plus=minus=0, then '2' has plus+minus===0 -> error
    // With mutation: if(false) -> no error thrown, '2' gets added to re
    
    expect(() => {
      new Complex('1 2');
    }).toThrow(SyntaxError);
  });
});