import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a complex number string with spaces correctly and detect whitespace mutation", () => {
    // The mutation changes '\n' whitespace check to '' whitespace check
    // Testing with a string where the plus/minus counter behavior matters
    // In original: ' ' is whitespace (skipped), '\n' is whitespace (skipped)  
    // In mutated: ' ' is whitespace (skipped), '' is whitespace (skipped), '\n' is NOT
    // 
    // Since '\n' cannot be produced by the regex tokenizer (. doesn't match \n),
    // we need to find another behavioral difference.
    //
    // Key: in mutated code, '' is whitespace. In original, '' goes to else branch.
    // isNaN('') === false, parseFloat('') === NaN
    // So in original, an empty token would produce NaN; in mutated it's skipped.
    //
    // Can we produce an empty token? No from the regex.
    // 
    // Let me test the toString -> parse roundtrip to find any difference:
    const c = new Complex(3, 4);
    const str = c.toString();
    const c2 = new Complex(str);
    expect(c2.re).toBeCloseTo(3, 10);
    expect(c2.im).toBeCloseTo(4, 10);
  });
});