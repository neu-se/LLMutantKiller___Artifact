// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4d22438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a < b", () => {
    const a = 1000;
    const b = 2000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    expect(c.abs()).toBe(expectedAbs);
  });
});