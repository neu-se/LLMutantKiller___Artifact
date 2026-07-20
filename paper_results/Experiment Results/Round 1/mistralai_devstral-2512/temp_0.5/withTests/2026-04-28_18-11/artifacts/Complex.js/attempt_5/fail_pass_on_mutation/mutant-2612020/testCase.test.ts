// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2612020/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse real numbers from strings without creating empty string property", () => {
    const c = new Complex("42");
    expect(c.re).toBe(42);
    expect(c.im).toBe(0);
    expect(Object.keys(c).includes("")).toBe(false);
  });
});