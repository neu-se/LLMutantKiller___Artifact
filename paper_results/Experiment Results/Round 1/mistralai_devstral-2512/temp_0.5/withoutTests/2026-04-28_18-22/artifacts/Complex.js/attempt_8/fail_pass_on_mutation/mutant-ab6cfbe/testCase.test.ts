// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ab6cfbe/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should handle log of negative zero correctly", () => {
    const result = new Complex(-0, 0).log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});