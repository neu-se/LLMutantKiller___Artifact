// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should correctly compute log(sqrt(a^2+b^2)) for values where a >= 3000 and b < 3000", () => {
    const a = 3500;
    const b = 1000;
    const complex = new Complex(a, b);
    const result = complex.log();
    const expectedRe = Math.log(Math.sqrt(a * a + b * b));
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});