// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-614ba77/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js module export", () => {
  it("should correctly export Complex as default", () => {
    // This test verifies that the default export is correctly set to Complex
    // The mutation changes Complex['default'] = Complex to Complex[""] = Complex
    // which would fail this test as the default export would be undefined
    expect(Complex.default).toBe(Complex);
  });
});