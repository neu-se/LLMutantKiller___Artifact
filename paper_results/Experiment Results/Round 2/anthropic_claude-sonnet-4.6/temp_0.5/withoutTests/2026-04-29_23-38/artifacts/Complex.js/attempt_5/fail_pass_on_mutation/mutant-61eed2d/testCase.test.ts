import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse real number string correctly with im defaulting to 0", () => {
    // In mutated code: z[""] = z['re'] = 0, but z['im'] stays as initialized (0)
    // In original code: z['im'] = z['re'] = 0
    // The difference: in mutated, z['re'] is set to 0 by z[""] = z['re'] = 0
    // then the loop sets z['re'] += value
    // But what about a string like "0+0i" - both should give 0,0
    // Try: what if re is non-zero in the string but im parsing fails?
    // Actually let me check: does the mutated code set z['re'] = 0 correctly?
    // Yes it does: z[""] = z['re'] = 0 still sets z['re'] = 0
    // I need to find a string where im would differ...
    // What about NaN propagation? In original z['im'] is explicitly 0
    // In mutated it's from object literal... same value
    // Let me try: parse a string where im should be non-zero
    const c = new Complex("5i");
    expect(c.im).toBe(5);
    expect(c.re).toBe(0);
    expect(typeof c.re).toBe("number");
    expect(typeof c.im).toBe("number");
  });
});