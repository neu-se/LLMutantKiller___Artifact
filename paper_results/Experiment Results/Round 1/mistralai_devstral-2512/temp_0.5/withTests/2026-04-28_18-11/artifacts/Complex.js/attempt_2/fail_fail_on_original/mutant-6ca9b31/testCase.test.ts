// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6ca9b31/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex numbers with negative imaginary parts", () => {
    const c = new Complex(1, -1);
    expect(c.toString()).toBe("1 - 1i");
  });
});