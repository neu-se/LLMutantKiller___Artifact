// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d9c2c8b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part of atanh for a specific complex number", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    expect(result.im).toBeCloseTo(0.4023594781362083, 10);
  });
});