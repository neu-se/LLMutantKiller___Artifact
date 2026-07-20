// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe('Complex.js export behavior', () => {
  it('should export Complex class with static properties when define is not available', () => {
    // The mutation breaks the else-if chain when define is not available
    // This test verifies the module still exports correctly with static properties
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe('function');

    // Test that we can access static properties
    expect(Complex.ZERO).toBeDefined();
    expect(Complex.ZERO.re).toBe(0);
    expect(Complex.ZERO.im).toBe(0);

    // Test that we can create instances
    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});