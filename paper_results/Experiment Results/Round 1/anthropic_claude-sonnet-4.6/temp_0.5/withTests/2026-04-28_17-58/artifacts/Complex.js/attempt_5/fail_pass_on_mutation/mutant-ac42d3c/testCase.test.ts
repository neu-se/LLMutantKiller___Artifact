import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan of (0, -1)", () => {
  it("toString should return expected string representation", () => {
    const result = new Complex(0, -1).atan();
    expect(result.toString()).toBe("Infinity");
  });
});