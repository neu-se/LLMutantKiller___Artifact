import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing whitespace handling", () => {
  it("should parse complex number with tab characters correctly and tabs should not affect result", () => {
    // Verify tab is still handled (not affected by mutation) and
    // test that a string passed through String.raw or with explicit \t works
    // The mutation changes '\n' check to false - test that \t still works
    // but more importantly verify the minus counter behavior with whitespace
    const c1 = new Complex("3\t+\t2i");
    const c2 = new Complex("3+2i");
    expect(c1.re).toBe(c2.re);
    expect(c1.im).toBe(c2.im);
  });
});