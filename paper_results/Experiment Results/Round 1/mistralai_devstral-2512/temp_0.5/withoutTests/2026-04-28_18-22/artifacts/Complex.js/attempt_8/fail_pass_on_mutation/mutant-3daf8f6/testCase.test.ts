// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3daf8f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should correctly handle edge case where a = 3000 and b = 3000", () => {
    const c = new Complex({ re: 3000, im: 3000 });
    const result = c.log();
    const expectedRe = Math.log(Math.sqrt(3000 * 3000 + 3000 * 3000));
    const expectedIm = Math.atan2(3000, 3000);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});