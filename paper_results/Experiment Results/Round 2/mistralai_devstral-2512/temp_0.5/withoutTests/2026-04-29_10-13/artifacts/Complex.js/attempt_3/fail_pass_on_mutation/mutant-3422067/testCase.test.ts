// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly compute hypot when a equals b and values are large", () => {
    const c = new Complex(3001, 3001);
    const abs = c.abs();
    const expected = Math.sqrt(3001 * 3001 + 3001 * 3001);
    expect(abs).toBeCloseTo(expected);
  });
});