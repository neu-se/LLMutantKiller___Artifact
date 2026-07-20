import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should throw when parsing a string with only a newline", () => {
    // '\n' is not matched by the regex dot, so tokens would be null
    // Both versions should throw
    expect(() => new Complex("\n")).toThrow(SyntaxError);
    
    // But what about a string that produces tokens including something
    // that behaves differently between original and mutated?
    // The only difference: original skips '\n', mutated skips ""
    // Neither can be a token from the regex
    // 
    // Let me try: what if we use a zero-width character or empty-looking character?
    // Actually, let me try the form feed character \f
    // \f is matched by . in JS regex (it's not a line terminator)
    // isNaN('\f') === false, Number('\f') === 0
    // So '\f' would be treated as 0 in both original and mutated (falls to else branch)
    // Not helpful
    
    // I'll test the basic invariant that both versions handle normal strings
    const c = new Complex("3+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});