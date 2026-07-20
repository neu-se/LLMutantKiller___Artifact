import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should use plus separator when imaginary part is positive small number", () => {
    const c = new Complex(3, 1e-15);
    const str = c.toString();
    // str should be "3 + 1e-15i"
    // The separator is at index 2 (space-plus-space pattern)
    expect(str).toBe("3 + 1e-15i");
  });
});