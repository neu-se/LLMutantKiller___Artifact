// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with whitespace", () => {
  it("should correctly handle newline characters in complex number strings", () => {
    const c = new Complex("1+2\ni");
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});