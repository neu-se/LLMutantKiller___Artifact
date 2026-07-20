import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should correctly parse a complex number string with embedded newline", () => {
    // In original: '\n' is recognized as whitespace and skipped
    // In mutated code: '\n' is not recognized, falls to else branch
    // isNaN('\n') === false (coerces to 0), so it tries to parse '\n' as a number
    // This causes plus+minus to become 0 after parsing, leading to wrong result
    const c = new Complex("1\n+2i");
    expect(c.re).toBeCloseTo(1, 10);
    expect(c.im).toBeCloseTo(2, 10);
  });
});