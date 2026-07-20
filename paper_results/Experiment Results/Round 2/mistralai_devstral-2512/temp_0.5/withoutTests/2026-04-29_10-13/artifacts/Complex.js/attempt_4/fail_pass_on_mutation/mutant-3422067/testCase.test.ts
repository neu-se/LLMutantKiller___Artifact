// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly handle the boundary case where a equals b in hypot calculation", () => {
    const c = new Complex(3000, 3000);
    const abs = c.abs();
    // This should use the simple path in original code but mutated path in mutant
    expect(abs).toBeCloseTo(3000 * Math.sqrt(2));
  });
});