// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-17b96b6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly compute acoth for non-zero complex numbers", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.14694666622552978);
    expect(result.im).toBeCloseTo(-0.3323069904224531);
  });
});