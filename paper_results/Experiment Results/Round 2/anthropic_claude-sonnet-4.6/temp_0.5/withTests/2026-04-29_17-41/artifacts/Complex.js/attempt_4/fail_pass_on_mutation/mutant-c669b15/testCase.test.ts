import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should produce correct result when dividing complex numbers", () => {
    // Test case where |c| < |d| (original takes if-branch, mutated also takes if-branch)
    // Use values where |c| is strictly less than |d|
    const result = new Complex(4, 3).div(new Complex(1, 2));
    // (4+3i)/(1+2i) = (4+3i)(1-2i)/5 = (4+6+i(3-8))/5 = 10/5 - 5i/5 = 2 - i
    expect(result.re).toBe(2);
    expect(result.im).toBe(-1);
  });
});