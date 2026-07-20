// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a15b74/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| < |d|", () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(0.5, 1);
    expect(result.im).toBeCloseTo(0.2, 1);
  });
});