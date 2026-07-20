// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-789d58e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosm1", () => {
  it("should correctly compute cosm1 for small values", () => {
    // The mutation changes the Taylor series coefficient from -1/3628800 to -1*3628800
    // This will significantly affect the result for small values where the Taylor series is used
    const x = 0.001;
    const expected = Math.cos(x) - 1;
    const result = (Complex as any).cosm1(x);
    expect(result).toBeCloseTo(expected, 10);
  });
});