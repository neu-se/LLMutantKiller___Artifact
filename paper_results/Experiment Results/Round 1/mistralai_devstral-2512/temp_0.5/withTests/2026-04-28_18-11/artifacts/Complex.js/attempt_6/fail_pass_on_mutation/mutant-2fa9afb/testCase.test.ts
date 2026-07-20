// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return the correct result for sinh(0 + 0i)", () => {
    const c = new Complex(0, 0);
    const result = c.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.toString()).toBe("0");
  });
});