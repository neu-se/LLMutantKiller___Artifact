// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe('Complex.js export behavior', () => {
  it('should export Complex class when define is not available', () => {
    // Test that the module exports correctly when define is not available
    // The mutation breaks the else-if chain, preventing proper export
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe('function');

    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    expect(c.add(1, 1).toString()).toBe('2 + 3i');
  });
});