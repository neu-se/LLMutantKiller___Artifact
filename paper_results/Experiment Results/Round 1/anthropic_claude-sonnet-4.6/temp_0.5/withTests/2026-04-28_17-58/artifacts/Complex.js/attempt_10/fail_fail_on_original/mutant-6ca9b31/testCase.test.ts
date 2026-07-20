import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should use plus sign for positive imaginary part", () => {
    expect(new Complex(3, 4).toString()).toBe("3+ 4i");
  });
});