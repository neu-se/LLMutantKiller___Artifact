// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a complex number from a string with real and imaginary parts", () => {
    const c = new Complex("3+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});