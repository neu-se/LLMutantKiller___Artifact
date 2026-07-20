import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline between sign and number", () => {
  it("should parse complex number with newline between plus sign and imaginary part", () => {
    // In original: '\n' is skipped as whitespace, so "1+\ni" parses as 1+i
    // In mutated: '\n' falls to else branch; isNaN('\n') is false (converts to 0),
    // so plus+minus becomes 0 after processing '+', then '\n' would be treated as 0
    // causing incorrect parsing
    const c = new Complex("1\n+\n2i");
    expect(c.re).toBeCloseTo(1);
    expect(c.im).toBeCloseTo(2);
  });
});