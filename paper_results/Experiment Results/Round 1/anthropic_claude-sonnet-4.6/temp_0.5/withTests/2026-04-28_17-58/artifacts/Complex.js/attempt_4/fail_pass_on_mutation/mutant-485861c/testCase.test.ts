import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null input", () => {
  it("should produce a valid zero complex number from null that equals zero", () => {
    const c = new Complex(null);
    const zero = new Complex(0, 0);
    expect(c.equals(zero)).toBe(true);
    expect(c.add(new Complex(3, 4)).equals(new Complex(3, 4))).toBe(true);
  });
});