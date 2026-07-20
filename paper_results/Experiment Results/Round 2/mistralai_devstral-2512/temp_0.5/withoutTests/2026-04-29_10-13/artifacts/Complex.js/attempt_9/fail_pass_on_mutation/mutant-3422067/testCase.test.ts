// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly compute hypot when a equals b at exactly 3000", () => {
    const c = new Complex(3000, 3000);
    const abs = c.abs();
    // The mutation changes the condition from a < b to a <= b
    // When a == b == 3000, original uses Math.sqrt(a*a + b*b)
    // Mutant uses the scaling approach which may have different precision
    // We test with exact equality to catch any precision differences
    expect(abs).toBe(3000 * Math.sqrt(2));
  });
});