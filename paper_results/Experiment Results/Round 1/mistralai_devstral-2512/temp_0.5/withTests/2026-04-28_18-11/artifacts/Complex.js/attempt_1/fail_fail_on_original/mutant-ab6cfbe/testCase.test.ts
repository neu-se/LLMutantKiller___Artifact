// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ab6cfbe/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.log", () => {
  it("should return NaN for log of zero with positive real part", () => {
    const zero = new Complex(0, 0);
    const result = zero.log();
    expect(result.isNaN()).toBe(true);
  });
});