// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0afc8f1/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.asech()", () => {
  it("should compute the inverse hyperbolic secant of a complex number", () => {
    const c = new Complex(2, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});