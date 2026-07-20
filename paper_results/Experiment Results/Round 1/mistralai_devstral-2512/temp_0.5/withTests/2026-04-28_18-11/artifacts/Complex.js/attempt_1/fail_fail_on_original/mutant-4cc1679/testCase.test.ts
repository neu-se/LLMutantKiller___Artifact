// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4cc1679/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should compute the inverse hyperbolic cosine of a complex number", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});