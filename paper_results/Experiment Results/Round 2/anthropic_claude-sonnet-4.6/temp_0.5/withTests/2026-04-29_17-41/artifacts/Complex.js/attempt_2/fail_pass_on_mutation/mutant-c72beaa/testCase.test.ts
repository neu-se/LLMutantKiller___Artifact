import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should produce NaN for subnormal inputs with opposite signs", () => {
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, -tiny);
    const result = c.acot();
    // d = tiny^2 + (-tiny)^2 = 0 (underflow)
    // Original: intermediate = (tiny/0, -(-tiny)/0) = (Inf, Inf) -> atan(Inf, Inf) -> NaN
    // Mutated:  intermediate = (tiny*0, tiny/0) = (0, Inf) -> atan(0, Inf) -> (-π/2, 0)
    expect(result.isNaN()).toBe(true);
  });
});