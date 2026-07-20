import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp mutation detection", () => {
  it("exp of real number should have zero imaginary part exactly representable", () => {
    // For im=0: cos(0)=1, sin(0)=0, so result should be (e^re, 0)
    // Both versions compute tmp * Math.cos(0) = tmp * 1 and tmp * Math.sin(0) = tmp * 0
    // The valueOf() returns re when im===0
    const c = new Complex(1, 0);
    const result = c.exp();
    // Check valueOf works (requires im === 0)
    expect(result.valueOf()).toBe(Math.E);
  });
});