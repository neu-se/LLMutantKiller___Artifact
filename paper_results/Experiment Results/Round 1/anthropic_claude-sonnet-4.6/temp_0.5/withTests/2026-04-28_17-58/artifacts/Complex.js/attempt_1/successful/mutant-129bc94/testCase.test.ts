import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex module exports", () => {
  it("should export Complex as Complex.Complex property", () => {
    expect((Complex as any)["Complex"]).toBe(Complex);
  });
});