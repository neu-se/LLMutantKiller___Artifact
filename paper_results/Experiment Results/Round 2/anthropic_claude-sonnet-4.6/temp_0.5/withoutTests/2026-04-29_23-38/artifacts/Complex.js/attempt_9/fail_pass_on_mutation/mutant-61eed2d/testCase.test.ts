import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should produce equivalent results when parsing string vs number input", () => {
    // Parse same value as string and as number - they should be equal
    const fromString = new Complex("3");
    const fromNumber = new Complex(3);
    
    // In original: string parse sets z['im'] = z['re'] = 0, then re accumulates to 3
    // In mutated: string parse sets z[''] = z['re'] = 0, z['im'] stays 0, re accumulates to 3
    // Both should give re=3, im=0
    
    // But what about the re value? In BOTH cases z['re'] is set to 0 before parsing
    // So re should accumulate correctly in both...
    
    // Let me try: what if the mutated code somehow doesn't reset re properly?
    // z[""] = z['re'] = 0 DOES set z['re'] = 0
    // So re is reset in both cases
    
    // I'm going to try testing with a negative imaginary to see if sign handling differs
    const c = new Complex("-3i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(-3);
    expect(fromString.re).toBe(fromNumber.re);
    expect(fromString.im).toBe(fromNumber.im);
  });
});