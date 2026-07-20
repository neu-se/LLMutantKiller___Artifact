// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-944b1b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct result for asec(0.5, 0.5)", () => {
    const result = new Complex(0.5, 0.5).asec();
    expect(result.re).toBeCloseTo(0.4636476090008061, 10);
    expect(result.im).toBeCloseTo(1.0172219678978514, 10);
  });
});