import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character as token", () => {
  it("should successfully parse a complex number string with embedded newline between sign and number", () => {
    // The regex /\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g matches '\n' as a single char token via the '.' pattern.
    // Original: '\n' is treated as whitespace and skipped.
    // Mutated: '\n' is not matched by the whitespace check (false instead of c==='\n'),
    // so it falls to the final else branch which calls parser_exit(), throwing SyntaxError.
    const result = new Complex("1\n+\n1i");
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(1);
  });
});