// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-711300e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse object with only 're' property", () => {
    const c = new Complex({ re: 5 });
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
  });
});