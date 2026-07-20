// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a6245b5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle the case where real part is -1 and imaginary part is non-zero", () => {
    const result = new Complex(-1, 0.5).atanh();
    expect(result.re).toBeCloseTo(-0.708303336014054, 10);
    expect(result.im).toBeCloseTo(0.9078874949608804, 10);
  });
});