// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-337791e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should optimize real number exponentiation when imaginary part is zero", () => {
    const c = new Complex(2, 0);
    const result = c.exp();
    expect(result.re).toBeCloseTo(Math.exp(2));
    expect(result.im).toBe(0);
  });
});