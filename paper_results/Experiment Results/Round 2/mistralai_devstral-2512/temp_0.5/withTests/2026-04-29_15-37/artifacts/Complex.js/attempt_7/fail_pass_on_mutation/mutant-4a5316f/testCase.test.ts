// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4a5316f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly handle negative imaginary infinity in acoth", () => {
    const c = new Complex(0, -1);
    const result = c.acoth();
    expect(result.im).toBeCloseTo(0.7853981633974483);
  });
});