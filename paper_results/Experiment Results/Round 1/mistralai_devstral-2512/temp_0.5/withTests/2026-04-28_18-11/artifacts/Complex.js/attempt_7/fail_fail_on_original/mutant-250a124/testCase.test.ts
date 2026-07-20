// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-250a124/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division mutation test", () => {
  it("should expose division mutation when divisor has small real part", () => {
    const a = new Complex(2, 3);
    const b = new Complex(0.5, 2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(1.4166666666666665, 10);
    expect(result.im).toBeCloseTo(-0.08333333333333333, 10);
  });
});