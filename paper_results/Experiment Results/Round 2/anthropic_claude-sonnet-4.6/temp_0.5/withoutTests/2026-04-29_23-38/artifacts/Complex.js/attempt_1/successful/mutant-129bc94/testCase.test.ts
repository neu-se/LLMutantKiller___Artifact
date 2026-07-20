import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex module exports", () => {
  it("should export Complex as the 'Complex' named property", () => {
    expect(Complex['Complex']).toBe(Complex);
  });
});