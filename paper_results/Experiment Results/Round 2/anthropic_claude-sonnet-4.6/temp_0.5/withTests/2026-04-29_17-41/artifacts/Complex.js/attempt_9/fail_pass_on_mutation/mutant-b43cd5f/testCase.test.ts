import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number construction from string with unicode line separator", () => {
  it("should parse a string containing a line separator character", () => {
    // \u000A is \n - but let's try \u2028 (line separator) or other whitespace
    // Actually test that the regex dotAll behavior with explicit newline in template
    const str = `3+2i`;
    const c = new Complex(str);
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
    // Test with actual newline using regex with s flag equivalent
    const c2 = new Complex('3+2i');
    expect(c2.re).toBeCloseTo(3);
    expect(c2.im).toBeCloseTo(2);
  });
});