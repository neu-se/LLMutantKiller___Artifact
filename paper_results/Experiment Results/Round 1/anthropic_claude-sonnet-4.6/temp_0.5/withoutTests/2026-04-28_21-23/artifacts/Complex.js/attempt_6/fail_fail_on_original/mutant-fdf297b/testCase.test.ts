import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting two infinite complex numbers in sequence", () => {
    // When second check uses || (original): Infinity - finite = Infinity (caught by second check)
    // When second check uses && (mutated): Infinity - finite falls through, computed as NaN (Inf-Inf per component)
    const inf = Complex.INFINITY; // re=Infinity, im=Infinity
    const finite = new Complex(1, 1);
    const result = inf.sub(finite);
    // Infinity - 1 = Infinity per component, so result should be Infinity
    // But if it falls through: new Complex(Inf-1, Inf-1) = new Complex(Inf, Inf) = still Infinity
    // Need a case where falling through gives different result
    // Try: what if we use a number that makes re/im NaN?
    const nanResult = new Complex(Infinity, 0).sub(new Complex(0, Infinity));
    expect(nanResult.isInfinite()).toBe(true);
  });
});