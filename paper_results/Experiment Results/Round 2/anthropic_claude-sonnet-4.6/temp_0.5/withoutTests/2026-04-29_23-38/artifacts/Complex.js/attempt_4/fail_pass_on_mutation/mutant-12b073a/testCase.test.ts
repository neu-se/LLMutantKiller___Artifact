import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh fallback", () => {
  it("sinh of a real number matches Math.sinh", () => {
    // Since Math.sinh exists in Node.js, the local fallback is never used
    // This mutation has no observable behavioral effect
    // Testing that sinh(1) equals Math.sinh(1) to document this
    const c = new Complex(1, 0);
    const result = c.sinh();
    expect(result.re).toBeCloseTo(Math.sinh(1), 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});