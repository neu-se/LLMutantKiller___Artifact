// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4d22438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function mutation test", () => {
  it("should correctly compute hypot for very large values where a < b", () => {
    const a = 3000;
    const b = 4000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    const actualAbs = c.abs();
    expect(actualAbs).toBeCloseTo(expectedAbs, 10);
    expect(actualAbs).not.toBe(Infinity);
    expect(actualAbs).not.toBe(NaN);
  });
});