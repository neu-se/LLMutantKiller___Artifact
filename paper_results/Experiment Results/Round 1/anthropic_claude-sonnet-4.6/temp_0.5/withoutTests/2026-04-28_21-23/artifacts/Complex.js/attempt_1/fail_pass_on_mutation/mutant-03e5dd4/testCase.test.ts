import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should correctly parse a complex number string containing a newline character", () => {
    // The mutation changes '\n' check to '"" (empty string) check
    // A string with a newline should be parsed correctly in original code
    // but will throw or behave differently in mutated code
    const result = new Complex("3\n+4i");
    expect(result.re).toBe(3);
    expect(result.im).toBe(4);
  });
});