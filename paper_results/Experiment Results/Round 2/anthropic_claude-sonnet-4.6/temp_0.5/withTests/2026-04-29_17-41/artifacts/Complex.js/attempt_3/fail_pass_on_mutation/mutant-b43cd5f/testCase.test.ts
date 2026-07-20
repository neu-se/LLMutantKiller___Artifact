import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline whitespace", () => {
  it("should correctly parse a complex number string with a newline, treating newline as whitespace", () => {
    // Original: '\n' is skipped as whitespace, so '1\n+2i' parses to re=1, im=2
    // Mutated: '\n' falls through to the number parsing branch, parseFloat('\n') = NaN,
    // but isNaN('\n') is false (Number('\n')===0), so '\n' is treated as 0,
    // corrupting the real part: re = 0 + 1 = 1 but then '\n' resets plus/minus=0
    // causing the subsequent '+' to fail with parser_exit() since plus+minus would be wrong
    const c = new Complex("1\n+2i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});