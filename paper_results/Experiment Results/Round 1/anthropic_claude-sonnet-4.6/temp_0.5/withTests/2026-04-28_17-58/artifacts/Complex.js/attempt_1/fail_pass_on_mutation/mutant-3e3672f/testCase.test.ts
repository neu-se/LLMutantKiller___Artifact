import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I", () => {
  it("should correctly parse complex numbers with uppercase I", () => {
    // The mutation changes `c === 'i' || c === 'I'` to `c === 'i' || false`
    // This means uppercase 'I' will no longer be recognized as the imaginary unit
    // Testing with uppercase 'I' in a complex number string
    const c = new Complex("3+2I");
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
  });
});