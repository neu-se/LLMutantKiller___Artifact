// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-485861c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle undefined input and not have unexpected properties", () => {
    const result = new Complex(undefined);
    const keys = Object.keys(result).sort();
    expect(keys).toEqual(["re", "im"]);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});