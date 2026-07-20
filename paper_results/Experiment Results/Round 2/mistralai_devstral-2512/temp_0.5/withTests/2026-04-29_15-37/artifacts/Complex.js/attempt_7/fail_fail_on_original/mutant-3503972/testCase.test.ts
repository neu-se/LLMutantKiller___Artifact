// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3503972/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return correct sign for purely imaginary input with negative imaginary part", () => {
    const c = new Complex(0, -1);
    const result = c.acsch();
    expect(result.im).toBeLessThan(0);
  });
});