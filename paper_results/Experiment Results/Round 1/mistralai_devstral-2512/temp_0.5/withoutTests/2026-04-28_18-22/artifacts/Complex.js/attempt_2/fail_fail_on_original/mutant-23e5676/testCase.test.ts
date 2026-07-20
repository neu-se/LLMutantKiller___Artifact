// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-23e5676/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute the arc cosecant for a specific complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.1459, 4);
    expect(result.im).toBeCloseTo(-0.1031, 4);
  });
});