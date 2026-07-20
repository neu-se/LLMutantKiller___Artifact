import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format complex number with zero real and negative imaginary correctly", () => {
    const c = new Complex(0, -1);
    expect(c.toString()).toBe("-i");
  });
});