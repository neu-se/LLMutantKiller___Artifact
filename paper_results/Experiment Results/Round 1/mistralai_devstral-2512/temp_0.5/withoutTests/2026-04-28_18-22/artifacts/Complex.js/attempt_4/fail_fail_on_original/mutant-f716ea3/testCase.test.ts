// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f716ea3/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atnh", () => {
  it("should correctly handle the case when a = -1 and b = 1", () => {
    const result = new Complex(-1, 1).atanh();
    expect(result.re).toBeCloseTo(-0.4023594781, 9);
    expect(result.im).toBeCloseTo(0.5535743588, 9);
  });
});