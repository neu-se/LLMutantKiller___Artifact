// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c72beaa/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct value for complex number with negative real part", () => {
    const result = new Complex(-1, 0).acot();
    expect(result.re).toBeCloseTo(1.350508121284784);
    expect(result.im).toBeCloseTo(0);
  });
});