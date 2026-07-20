// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1bc0144/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle the real part of the complex number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});