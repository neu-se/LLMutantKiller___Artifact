import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("should return ZERO when called on INFINITY", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.inverse();
    expect(result.isZero()).toBe(true);
  });
});