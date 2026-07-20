// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-53e9f2e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes division to multiplication, which will significantly alter the result
    // We test against a known expected value for this specific input
    expect(result.re).toBeCloseTo(0.2298, 4);
    expect(result.im).toBeCloseTo(0.4812, 4);
  });
});