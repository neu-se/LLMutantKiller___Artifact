import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case", () => {
  it("should return NaN when computing atanh of zero+zero*i (d===0 branch)", () => {
    // When a=0, b=0, d=0: original uses (a !== -1) ? (a/0) : 0 => NaN
    // Mutated uses (a === -1) ? (a/0) : 0 => 0
    const result = new Complex(0, 0).atanh();
    // The original code produces NaN for the real part in this edge case
    // because (0 !== -1) is true, so it evaluates 0/0 = NaN
    expect(result.isNaN()).toBe(true);
  });
});