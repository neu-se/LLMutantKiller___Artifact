import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("pow(0, 3) imaginary part should be negative zero via imaginary base path", () => {
    const result = new Complex(0, 0).pow(3);
    expect(Object.is(result.im, -0)).toBe(true);
  });
});