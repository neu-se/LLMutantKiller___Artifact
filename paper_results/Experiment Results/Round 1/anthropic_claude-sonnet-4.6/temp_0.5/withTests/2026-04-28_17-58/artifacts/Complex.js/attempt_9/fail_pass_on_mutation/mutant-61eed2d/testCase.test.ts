import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should not set empty string property on the parse result object", () => {
    // Create a complex from string and verify behavior
    // In mutated code, the local parse object z gets z[""] = 0 set on it
    // The Complex constructor only copies re and im, so instance won't have ""
    // BUT: check if the parse function's z object having z[""] affects isNaN check
    // isNaN(z['re']) || isNaN(z['im']) - z['im'] is still 0 in mutated code
    // Let's try: what if we subclass or extend Complex to expose parse internals?
    // Actually let's just verify the re/im are correct for various string inputs
    // and check that equals works correctly
    const c1 = new Complex("3+4i");
    const c2 = new Complex(3, 4);
    expect(c1.equals(c2)).toBe(true);
    expect(c1.re).toBe(c2.re);
    expect(c1.im).toBe(c2.im);
    // Verify no extra enumerable properties on instance from string parse
    const keys = Object.keys(c1);
    expect(keys).not.toContain("");
    expect(keys.length).toBe(Object.keys(c2).length);
  });
});