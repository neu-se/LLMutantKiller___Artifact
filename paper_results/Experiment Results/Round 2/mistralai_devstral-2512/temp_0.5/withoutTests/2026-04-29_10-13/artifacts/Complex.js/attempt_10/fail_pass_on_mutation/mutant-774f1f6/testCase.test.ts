// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a complex number from polar form with r and phi", () => {
    const c = new Complex({ r: 2, phi: Math.PI/2 });
    expect(c.re).toBeCloseTo(0);
    expect(c.im).toBeCloseTo(2);
  });
});