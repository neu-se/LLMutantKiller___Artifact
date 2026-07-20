import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle case where both real and imaginary parts are non-zero and trigger the mutation", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // This test specifically checks the behavior that would be affected by the mutation
    // where (a !== 0) is changed to (false)
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});