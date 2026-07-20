// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should throw an error when the mutation breaks the acos call", () => {
    const c = new Complex(1, 1);
    // The mutation changes this["acos"]() to this[""]() which should cause an error
    // when trying to call an empty string as a function
    expect(() => c.asinh()).toThrow();
  });
});