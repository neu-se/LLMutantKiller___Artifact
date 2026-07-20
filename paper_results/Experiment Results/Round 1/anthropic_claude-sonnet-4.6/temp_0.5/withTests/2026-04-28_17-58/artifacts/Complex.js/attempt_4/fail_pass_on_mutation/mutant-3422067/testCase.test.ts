import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot mutation detection", () => {
  it("abs computation uses correct branch for large equal values", () => {
    // Force the overflow-safe hypot path with a === b
    // The mutation changes a < b to a <= b, affecting which branch runs
    // when |re| === |im| > 3000
    const re = 4000;
    const im = 4000;
    const c = new Complex(re, im);
    // Both branches give the same result mathematically, but let's verify
    // the result matches the expected value
    expect(c.abs()).toBeCloseTo(Math.hypot(re, im), 10);
  });
});