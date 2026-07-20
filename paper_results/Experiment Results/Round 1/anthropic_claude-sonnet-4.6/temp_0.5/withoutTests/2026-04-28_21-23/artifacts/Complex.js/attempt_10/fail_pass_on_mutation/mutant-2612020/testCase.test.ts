import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly parse string where re starts non-zero due to prototype", () => {
    // If z['re'] is not reset and z had a non-zero re from somewhere,
    // the parsed real part would be wrong
    // Since z = {'re': 0, 'im': 0}, re is always 0 at start
    // The only detectable difference: z[""] property on the parse result
    // Let's verify by checking if the complex number from string
    // behaves identically to one created from numbers
    const s = new Complex("1");
    const n = new Complex(1, 0);
    expect(s.re).toBe(n.re);
    expect(s.im).toBe(n.im);
    expect(s.equals(n)).toBe(true);
    // Check no "" property leaked
    expect("" in s).toBe(false);
  });
});