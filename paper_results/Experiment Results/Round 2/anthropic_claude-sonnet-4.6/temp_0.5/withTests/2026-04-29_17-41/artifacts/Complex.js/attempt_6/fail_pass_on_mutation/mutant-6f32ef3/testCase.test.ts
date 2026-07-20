import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format complex number with small real part and zero imaginary correctly", () => {
    // a gets zeroed by epsilon, b is 0 -> early return
    // Both same... 
    // Let me try: what does "1 - 0i" look like?
    const c = new Complex(1, -0);
    expect(c.toString()).toBe("1");
  });
});