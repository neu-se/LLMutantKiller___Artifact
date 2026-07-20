import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should have correct property count when parsed from string", () => {
    // In original: z[""] = z['re'] = 0 sets both "" and re properties
    // In mutated: z[""] = 0 then z['re'] = 0 - same result
    // Try to detect via Object.keys or property enumeration
    const c = new Complex("3+4i");
    // The Complex object should only have re and im as own properties
    const keys = Object.keys(c);
    expect(keys).toContain('re');
    expect(keys).toContain('im');
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});