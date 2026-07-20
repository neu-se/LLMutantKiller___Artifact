import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of positive real should have zero imaginary part and correct real part", () => {
    // With original: b===0 && a>0 is true for (2, 0)
    // With mutation: b===0 && a<=0 is false for (2, 0), different code path
    // If the if-block contains the main return statement, then mutation causes undefined return
    const result = new Complex(2, 0).log();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result.re).toBeCloseTo(Math.log(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});