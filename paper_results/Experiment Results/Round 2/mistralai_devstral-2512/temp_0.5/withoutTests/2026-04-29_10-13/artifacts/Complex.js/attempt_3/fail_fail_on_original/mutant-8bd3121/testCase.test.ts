// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should throw an error when accessing invalid property in asech", () => {
    const c = new Complex(0.5, 0);
    expect(() => c.asech()).toThrow();
  });
});