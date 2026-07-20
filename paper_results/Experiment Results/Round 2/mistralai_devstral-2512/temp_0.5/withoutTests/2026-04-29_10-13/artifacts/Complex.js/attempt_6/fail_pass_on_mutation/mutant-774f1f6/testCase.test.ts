// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a complex number from an object with re and im properties", () => {
    const c = new Complex({ re: 2, im: 3 });
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
  });
});