import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I as imaginary unit", () => {
  it("should parse a complex number string using uppercase 'I' without throwing", () => {
    // In the original code, 'I' is recognized as the imaginary unit just like 'i'
    // In the mutated code, 'I' is no longer recognized, causing parser_exit() to throw
    const c = new Complex('2+3I');
    expect(c.re).toBeCloseTo(2);
    expect(c.im).toBeCloseTo(3);
  });
});