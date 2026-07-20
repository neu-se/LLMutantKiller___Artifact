import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse null branch", () => {
  it("should produce re=0 when null passed, detectable via division", () => {
    const c = new Complex(null);
    // Test re is 0 by checking it doesn't affect multiplication
    const result = new Complex(2, 3).add(c);
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
    // Check the null complex itself has re=0 strictly
    expect(c.re).toBe(0);
    expect(c.re).not.toBeUndefined();
    expect(c.im).toBe(0);
    expect(c.im).not.toBeUndefined();
  });
});