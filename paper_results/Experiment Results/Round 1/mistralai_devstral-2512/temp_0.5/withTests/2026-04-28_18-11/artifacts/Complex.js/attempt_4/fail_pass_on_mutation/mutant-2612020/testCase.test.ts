// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2612020/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle empty string property assignment during parsing", () => {
    const c = new Complex("2+3i");
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
    expect(c[""]).toBeUndefined();
  });
});