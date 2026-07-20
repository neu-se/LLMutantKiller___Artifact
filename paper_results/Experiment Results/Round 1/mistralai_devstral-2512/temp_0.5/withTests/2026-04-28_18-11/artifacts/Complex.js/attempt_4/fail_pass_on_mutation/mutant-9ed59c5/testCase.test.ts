// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex.js module export", () => {
  it("should have Complex available in the module exports", () => {
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe('function');
    expect(Complex.Complex).toBeDefined();
    expect(Complex.default).toBeDefined();
  });
});