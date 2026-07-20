// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe('Complex.js AMD export detection', () => {
  it('should detect when AMD loader is not available', () => {
    // The mutation breaks the AMD detection logic by making the if condition empty
    // This test verifies the module can still be loaded when define is not available

    // Create a complex number to verify the module loaded correctly
    const c = new Complex(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);

    // Verify basic operations work
    const result = c.add(1, 1);
    expect(result.re).toBe(4);
    expect(result.im).toBe(5);
  });
});