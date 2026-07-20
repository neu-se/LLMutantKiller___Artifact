// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a complex number from polar form with abs and arg", () => {
    const c = new Complex({ abs: 5, arg: Math.PI/4 });
    expect(c.re).toBeCloseTo(5 * Math.cos(Math.PI/4));
    expect(c.im).toBeCloseTo(5 * Math.sin(Math.PI/4));
  });
});