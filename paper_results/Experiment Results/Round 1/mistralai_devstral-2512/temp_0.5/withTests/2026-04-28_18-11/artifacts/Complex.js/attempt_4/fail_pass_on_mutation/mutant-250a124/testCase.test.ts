// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-250a124/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division mutation test", () => {
  it("should expose division mutation when divisor's real part is smaller than imaginary part", () => {
    const a = new Complex(3, 4);
    const b = new Complex(1, 2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2.2, 10);
    expect(result.im).toBeCloseTo(-0.4, 10);
  });
});