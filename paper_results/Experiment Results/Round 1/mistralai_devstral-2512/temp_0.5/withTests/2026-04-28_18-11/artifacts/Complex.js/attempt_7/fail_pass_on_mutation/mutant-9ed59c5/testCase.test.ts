// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex.js module export structure", () => {
  it("should have correct module export structure with __esModule flag", () => {
    // The mutation removes the proper AMD/CommonJS export handling
    // This test checks for the specific structure that would be missing in the mutated version
    expect(Complex).toBeDefined();
    expect(Complex.__esModule).toBe(true);
    expect(Complex.default).toBe(Complex);
    expect(Complex.Complex).toBe(Complex);

    // Additional check for module structure integrity
    const moduleKeys = Object.keys(Complex);
    expect(moduleKeys).toContain('default');
    expect(moduleKeys).toContain('Complex');
    expect(moduleKeys).toContain('ZERO');
    expect(moduleKeys).toContain('ONE');
    expect(moduleKeys).toContain('I');
  });
});