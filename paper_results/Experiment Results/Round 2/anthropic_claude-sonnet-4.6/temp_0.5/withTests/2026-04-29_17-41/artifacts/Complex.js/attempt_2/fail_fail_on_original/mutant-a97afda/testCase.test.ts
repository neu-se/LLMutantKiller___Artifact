import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return finite result for atan(0 + 2i) not the b===1 special case", () => {
    // With b=2 (im=2), original: if(b===1) is false, normal computation
    // With mutated if(true): always takes special branch, returns wrong result
    const result = new Complex(0, 2).atan();
    expect(result.isFinite()).toBe(true);
    expect(result.re).toBeCloseTo(0, 10);
    // atan(2i) = i * atanh(2) = i * (ln(3)/2) ≈ 0.5493i... wait
    // atan(bi) = i/2 * log((i+bi)/(i-bi)) = i/2 * log((1+b)/(1-b))
    // for b=2: i/2 * log(-3) which involves complex log
    expect(Number.isFinite(result.re)).toBe(true);
  });
});