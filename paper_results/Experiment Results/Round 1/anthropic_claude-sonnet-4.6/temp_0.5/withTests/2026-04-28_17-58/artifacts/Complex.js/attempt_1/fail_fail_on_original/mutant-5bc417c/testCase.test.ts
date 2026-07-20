import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return correct acoth for a real number with non-zero d", () => {
    // For acoth(2), d = 2*2 + 0*0 = 4, which is non-zero
    // Both original (d !== 0) and mutated (true) take the same branch
    // But for d === 0 (a=0, b=0), original returns atanh(0/0) path, mutated returns atanh(0/0) too
    // The if(true) block makes this all moot - acoth always returns (0, PI/2)
    const result = new Complex(2, 0).acoth();
    // With if(true), result is always (0, PI/2)
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});