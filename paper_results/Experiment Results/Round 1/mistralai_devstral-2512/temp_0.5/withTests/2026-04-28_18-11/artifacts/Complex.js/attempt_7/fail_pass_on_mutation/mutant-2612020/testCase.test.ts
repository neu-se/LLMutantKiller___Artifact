// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2612020/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle string parsing without creating empty string property", () => {
    const c = new Complex("3+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
    expect(c.hasOwnProperty("")).toBe(false);
  });
});