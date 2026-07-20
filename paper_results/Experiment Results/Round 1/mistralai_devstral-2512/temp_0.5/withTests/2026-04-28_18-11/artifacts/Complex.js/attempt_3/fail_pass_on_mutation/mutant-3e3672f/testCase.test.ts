// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3e3672f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with uppercase 'I'", () => {
  it("should correctly parse complex numbers with uppercase 'I'", () => {
    const result = new Complex("5I");
    expect(result.re).toBe(0);
    expect(result.im).toBe(5);
  });
});