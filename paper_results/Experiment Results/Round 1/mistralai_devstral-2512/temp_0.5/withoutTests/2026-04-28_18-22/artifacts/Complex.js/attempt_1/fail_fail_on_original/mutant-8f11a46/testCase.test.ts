// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8f11a46/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with negative imaginary parts", () => {
    const c = new Complex("1-2i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(-2);
  });
});