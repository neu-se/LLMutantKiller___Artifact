import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline characters", () => {
  it("should throw when parsing a complex number string containing a newline in the mutated version", () => {
    // Original: '\n' is treated as whitespace and skipped
    // Mutated: '\n' is not recognized, causing parser_exit() to throw
    // We verify the original behavior: parsing succeeds and returns correct values
    const c = new Complex("3+4i\n");
    expect(c.re).toBeCloseTo(3);
    expect(c.im).toBeCloseTo(4);
  });
});