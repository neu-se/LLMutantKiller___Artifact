import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with leading plus sign correctly", () => {
    // Test edge case: string starting with + 
    // In original: z['im'] = z['re'] = 0 (both reset)
    // In mutated: z[""] = z['re'] = 0 (only re reset, im stays 0 from literal)
    // The re value matters here - if re wasn't reset to 0, accumulated value would differ
    // But z starts with re:0 already...
    // Let's try a string that would expose if re is NOT reset
    const c = new Complex("+1");
    expect(c.re).toBe(1);
    expect(c.im).toBe(0);
  });
});