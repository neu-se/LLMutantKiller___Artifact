// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dafedd5/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.ceil", () => {
  it("should correctly ceil complex numbers with non-zero places", () => {
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(1);
    expect(result.re).toBe(1.3);
    expect(result.im).toBe(5.7);
  });
});