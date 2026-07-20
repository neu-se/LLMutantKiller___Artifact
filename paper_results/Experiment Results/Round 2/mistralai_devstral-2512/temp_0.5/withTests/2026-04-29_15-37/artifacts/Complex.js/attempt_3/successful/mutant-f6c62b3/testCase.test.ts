// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f6c62b3/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex.js module export", () => {
  it("should correctly define the __esModule property", () => {
    // This test verifies that the __esModule property is correctly set
    // The mutation changes the property name from "__esModule" to an empty string
    expect(Complex).toHaveProperty("__esModule");
    expect(Complex.__esModule).toBe(true);
  });
});