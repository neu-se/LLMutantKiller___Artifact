import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should throw or produce wrong result when newline appears after operator in mutated code", () => {
    // In original: '\n' skipped, "1+\n2" parses as re=3 (1+2), im=0
    // In mutated: '\n' treated as token 0 after '+', consuming the plus,
    // then '2' has plus+minus=0 causing parser_exit()
    const c = new Complex("1+\n2");
    expect(c.re).toBe(3);
    expect(c.im).toBe(0);
  });
});