// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex.js export structure validation", () => {
  it("should have proper module export structure with all expected properties", () => {
    // The mutation breaks the AMD export path which affects the module structure
    // This test checks for specific properties that would be missing or incorrect in the mutated version

    // Verify the module has the expected structure
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe('function');

    // Check for ES module flag
    expect(Complex.__esModule).toBe(true);

    // Check for named exports
    expect(Complex.default).toBe(Complex);
    expect(Complex.Complex).toBe(Complex);

    // Check for static properties
    expect(Complex.ZERO).toBeDefined();
    expect(Complex.ONE).toBeDefined();
    expect(Complex.I).toBeDefined();
    expect(Complex.PI).toBeDefined();
    expect(Complex.E).toBeDefined();
    expect(Complex.INFINITY).toBeDefined();
    expect(Complex.NAN).toBeDefined();
    expect(Complex.EPSILON).toBe(1e-15);

    // Verify we can create instances
    const c = new Complex(2, 3);
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
  });
});