// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fc65420/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return correct value for non-zero real input", () => {
    const result = new Complex(0.5, 0).acsch();
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBe(0);
  });
});