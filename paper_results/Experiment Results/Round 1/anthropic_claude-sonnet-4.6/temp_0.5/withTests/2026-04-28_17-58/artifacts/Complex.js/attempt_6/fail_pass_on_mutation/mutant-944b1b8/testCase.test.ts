import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec of i (purely imaginary unit) should not be NaN", () => {
    // For asec(i): a=0, b=1, d=1
    // Original: new Complex((0!==0)?0/0:0, (1!==0)?-1/0:0) = new Complex(0, -Inf).acos()
    // Mutated:  new Complex((true)?0/0:0, (1!==0)?-1/0:0) = new Complex(NaN, -Inf).acos()
    const result = new Complex(0, 1).asec();
    expect(result.isNaN()).toBe(false);
  });
});