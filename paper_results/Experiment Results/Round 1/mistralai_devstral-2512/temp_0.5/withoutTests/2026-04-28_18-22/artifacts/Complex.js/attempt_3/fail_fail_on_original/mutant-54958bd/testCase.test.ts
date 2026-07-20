// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-54958bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the sign of the imaginary part in acosh result", () => {
    const c = new Complex(1, -1);
    const result = c.acosh();
    // The mutation changes res["re"] to res[""] which will cause incorrect behavior
    // when handling the sign of the imaginary part
    expect(result.im).toBeGreaterThan(0);
  });
});