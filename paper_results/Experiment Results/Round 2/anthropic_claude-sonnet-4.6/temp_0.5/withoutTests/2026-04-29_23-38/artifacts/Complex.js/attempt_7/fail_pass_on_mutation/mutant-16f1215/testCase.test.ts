import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc with -0 real and -0 imaginary parts should return PI/2 + Infinity*i", () => {
    // -0 === 0 in JS, so early return triggers for (-0, -0)
    // This tests the early return path which is unaffected by mutation
    // But for (-0, 0): a=-0, b=0: a===0 && b===0 is true (since -0===0), early return
    // For (0, -0): same
    // The mutation is in dead code - let's verify the early return still works
    const result = new Complex(-0, -0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
  });
});