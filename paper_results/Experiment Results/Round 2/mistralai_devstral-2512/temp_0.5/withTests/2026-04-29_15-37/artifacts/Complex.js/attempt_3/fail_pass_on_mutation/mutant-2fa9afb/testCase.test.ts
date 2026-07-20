// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh()", () => {
  it("should correctly compute sinh(1 + 0i) without throwing an error", () => {
    const result = new Complex(1, 0).sinh();
    expect(result.re).toBeCloseTo(Math.sinh(1));
    expect(result.im).toBe(0);
  });
});