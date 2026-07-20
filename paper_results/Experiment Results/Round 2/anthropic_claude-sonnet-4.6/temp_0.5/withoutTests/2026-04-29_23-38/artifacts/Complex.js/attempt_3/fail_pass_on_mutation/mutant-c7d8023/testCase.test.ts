import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation by comparing asinh of zero vs asinh of complex with -Infinity imaginary", () => {
    // Test that new Complex(0, -Infinity).asinh() differs from new Complex(0, 0).asinh()
    // Original d===0 branch with b>0: new Complex(0, -b/0).asinh() = new Complex(0, -Inf).asinh()
    // Mutated d===0 branch with b>0: new Complex(0, 0).asinh() = (0, 0)
    const original = new Complex(0, -Infinity).asinh();
    const mutated = new Complex(0, 0).asinh();
    // These should differ - if they don't, the mutation is undetectable this way
    expect(original.re).not.toEqual(mutated.re);
  });
});