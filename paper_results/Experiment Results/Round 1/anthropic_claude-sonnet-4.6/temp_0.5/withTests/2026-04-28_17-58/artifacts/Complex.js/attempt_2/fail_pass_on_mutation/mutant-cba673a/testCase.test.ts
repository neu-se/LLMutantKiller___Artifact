import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("cosh of a real number should return the correct real cosh value", () => {
    // This test documents that the mutation cannot be distinguished in Node.js
    // because Math.cosh exists and the fallback is never invoked.
    // We test the .cosh() method directly to confirm correct behavior.
    const z = new Complex(2, 0);
    const result = z.cosh();
    expect(result.re).toBeCloseTo(Math.cosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});