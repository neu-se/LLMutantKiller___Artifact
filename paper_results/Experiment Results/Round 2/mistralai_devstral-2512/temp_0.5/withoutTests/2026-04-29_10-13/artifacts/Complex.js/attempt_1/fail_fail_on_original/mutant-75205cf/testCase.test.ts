// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-75205cf/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return Infinity when subtracting a finite number from Infinity", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(5, 3);
    const result = infinity.sub(finite);
    expect(result.isInfinite()).toBe(true);
  });
});