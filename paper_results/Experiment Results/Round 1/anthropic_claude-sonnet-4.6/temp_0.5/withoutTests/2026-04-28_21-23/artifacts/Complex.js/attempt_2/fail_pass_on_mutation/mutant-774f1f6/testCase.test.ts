import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null parsing", () => {
  it("should not set an empty string property when parsing null", () => {
    const c = new Complex(null);
    expect(Object.prototype.hasOwnProperty.call(c, "")).toBe(false);
  });
});