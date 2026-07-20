// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-250a124/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division mutation test", () => {
  it("should expose division mutation with specific values", () => {
    const a = new Complex(5, 10);
    const b = new Complex(1, 3);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(3.25, 10);
    expect(result.im).toBeCloseTo(-1.25, 10);
  });
});