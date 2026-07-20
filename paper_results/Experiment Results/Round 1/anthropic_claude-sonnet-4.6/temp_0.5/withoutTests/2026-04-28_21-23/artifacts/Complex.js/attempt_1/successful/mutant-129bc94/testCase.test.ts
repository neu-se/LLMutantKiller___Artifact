import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex module exports", () => {
  it("should export Complex class as 'Complex' property on the module", () => {
    expect(Complex['Complex']).toBe(Complex);
  });
});