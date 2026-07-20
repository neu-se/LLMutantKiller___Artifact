// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-630b40d/testCase.test.ts
import { Complex } from "./complex.js";

describe("hypot function mutation test", () => {
  it("should correctly compute hypot for large values", () => {
    const c = new Complex(3000, 4000);
    const abs = c.abs();
    expect(abs).toBeCloseTo(5000, 10);
  });
});