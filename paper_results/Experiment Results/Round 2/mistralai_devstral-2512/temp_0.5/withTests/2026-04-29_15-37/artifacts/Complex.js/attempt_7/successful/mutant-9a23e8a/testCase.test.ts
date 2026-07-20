// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a23e8a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a real number where a*a != a/a", () => {
    const z = new Complex(2, 0);
    const result = z.acsch();
    // For a=2: original computes log(2 + sqrt(4+1)) = log(2+sqrt(5)) ≈ 1.4436354751788103
    // Mutated computes log(2 + sqrt(1+1)) = log(2+sqrt(2)) ≈ 1.1418732247726542
    // The original should give ~1.4436, mutated gives ~1.1419
    expect(result.re).toBeCloseTo(1.4436354751788103, 5);
    expect(result.im).toBeCloseTo(0);
  });
});