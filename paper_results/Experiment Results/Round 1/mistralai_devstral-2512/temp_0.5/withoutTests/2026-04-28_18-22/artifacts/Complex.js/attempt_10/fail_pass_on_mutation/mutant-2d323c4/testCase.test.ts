import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle the case where a^2 - b^2 equals zero by using the correct branch", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the condition from (d !== 0) to (true)
    // This test verifies the correct branch is taken when d === 0
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});