// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should throw when accessing invalid property due to mutation", () => {
    // The mutation changes this['im'] to this[""] which should cause an error
    // when trying to access an undefined property
    expect(() => {
      const c = new Complex(1, 1);
      c.sech();
    }).toThrow();
  });
});