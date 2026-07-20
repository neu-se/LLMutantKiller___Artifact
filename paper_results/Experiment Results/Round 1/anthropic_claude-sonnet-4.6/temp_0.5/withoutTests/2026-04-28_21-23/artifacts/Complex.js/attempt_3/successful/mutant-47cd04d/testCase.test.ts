import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add", () => {
  it("should return INFINITY when adding a NaN-containing complex to an infinite complex", () => {
    // new Complex(Infinity, NaN): isNaN()=true, isInfinite()=false (because isNaN is true)
    // new Complex(-Infinity, 0): isNaN()=false, isFinite()=false, isInfinite()=true
    //
    // In add():
    // First check uses && (both infinite = NaN):
    //   this.isInfinite()=false && z.isInfinite()=true => false, proceed
    //
    // Second check (original): this.isInfinite() || z.isInfinite() = false || true = true
    //   => returns Complex['INFINITY'] (isInfinite = true)
    //
    // Second check (mutated = false):
    //   => falls through to arithmetic:
    //   new Complex(Infinity + (-Infinity), NaN + 0) = new Complex(NaN, NaN)
    //   => isNaN() = true, isInfinite() = false
    
    const nanComplex = new Complex(Infinity, NaN);
    const infComplex = new Complex(-Infinity, 0);
    const result = nanComplex.add(infComplex);
    
    expect(result.isInfinite()).toBe(true);
  });
});