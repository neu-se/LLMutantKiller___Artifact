import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle the case when b is not zero", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the condition from `if (b === 0)` to `if (true)`
    // This means the special case for b === 0 will always execute, even when b !== 0
    // For b !== 0, this should produce incorrect results
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(0);
  });
});