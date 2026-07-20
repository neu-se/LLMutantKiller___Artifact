// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe('Complex.js export behavior', () => {
  it('should have working module exports when define is not available', () => {
    // The mutation breaks the else-if chain when define is not available
    // This test verifies the module still exports correctly in that case
    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);

    // Test that the exported Complex is the same as the constructor
    expect(Complex).toBe(c.constructor);

    // Test that we can access static properties
    expect(Complex.ZERO.re).toBe(0);
    expect(Complex.ZERO.im).toBe(0);
  });
});