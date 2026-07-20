import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle the mutation in acsc calculation where a*a becomes a/a", () => {
    // The mutation changes var d = a * a + b * b; to var d = a / a + b * b;
    // When a=0, this creates a division by zero (0/0 = NaN) in the mutated version
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The original should produce a valid result
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
    // The mutated version would produce NaN due to 0/0
  });
});