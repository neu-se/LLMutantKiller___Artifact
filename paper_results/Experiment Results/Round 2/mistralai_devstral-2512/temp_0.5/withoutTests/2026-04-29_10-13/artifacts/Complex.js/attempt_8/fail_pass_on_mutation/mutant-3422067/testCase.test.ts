// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly compute hypot when a equals b at the boundary of 3000", () => {
    const c = new Complex(3000, 3000);
    const abs = c.abs();
    // This test targets the specific mutation where a < b was changed to a <= b
    // When a == b == 3000, the original takes the first branch (Math.sqrt)
    // The mutant takes the second branch (scaling approach)
    // The results should be mathematically equivalent but may differ in precision
    const expected = 3000 * Math.sqrt(2);
    expect(abs).toBeCloseTo(expected, 12);
  });
});