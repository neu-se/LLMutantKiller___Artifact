// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1ee66d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle non-zero imaginary component", () => {
    const result = new Complex(0, 1).acsc();
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(-0.5596157879354227, 10);
  });
});