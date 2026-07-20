// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly compute hypot when a equals b at the boundary condition", () => {
    const c = new Complex(3000, 3000);
    const abs = c.abs();
    // This test specifically targets the boundary where a == b == 3000
    // The original code uses the simple sqrt path when both values are <= 3000
    // The mutant changes the condition to a <= b, which affects the path taken
    // We test with high precision to catch any differences in calculation
    const expected = Math.sqrt(3000 * 3000 + 3000 * 3000);
    expect(abs).toBeCloseTo(expected, 15);
  });
});