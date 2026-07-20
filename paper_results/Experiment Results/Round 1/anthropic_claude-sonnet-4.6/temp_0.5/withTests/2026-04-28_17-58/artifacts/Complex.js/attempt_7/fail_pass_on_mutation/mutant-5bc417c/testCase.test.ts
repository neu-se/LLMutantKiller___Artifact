import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of nonzero complex number should not return (0, PI/2)", () => {
    // If if(true) always executes, acoth(1+1i) wrongly returns (0, PI/2)
    // Original: only executes when a===0 && b===0 (or similar condition)
    const result = new Complex(1, 1).acoth();
    // The correct acoth(1+i) should have im != PI/2
    expect(result.re).not.toBeCloseTo(0);
  });
});