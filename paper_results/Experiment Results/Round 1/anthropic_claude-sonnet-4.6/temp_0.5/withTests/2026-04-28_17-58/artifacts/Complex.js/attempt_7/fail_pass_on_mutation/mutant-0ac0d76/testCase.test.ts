import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of negative real number should return correct complex result not NaN", () => {
    // log(-1) = 0 + pi*i
    // Original: b===0 && a>0 is false for a=-1, falls through to logHypot+atan2 = 0+pi*i
    // Mutated: b===0 && a<=0 is true for a=-1, returns Math.log(-1)=NaN early
    const result = new Complex(-1, 0).log();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});