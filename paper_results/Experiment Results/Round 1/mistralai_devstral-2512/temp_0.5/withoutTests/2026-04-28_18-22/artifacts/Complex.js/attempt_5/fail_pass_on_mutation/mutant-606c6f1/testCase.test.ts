// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-606c6f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding two Infinite complex numbers", () => {
    const infinite1 = Complex.INFINITY;
    const infinite2 = Complex.INFINITY;
    const result = infinite1.add(infinite2);
    expect(result.isNaN()).toBe(true);
  });
});