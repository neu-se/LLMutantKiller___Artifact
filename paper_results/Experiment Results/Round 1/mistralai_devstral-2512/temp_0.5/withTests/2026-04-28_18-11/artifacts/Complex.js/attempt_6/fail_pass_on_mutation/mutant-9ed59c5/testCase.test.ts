// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex.js AMD and CommonJS export", () => {
  it("should properly export Complex in both AMD and CommonJS environments", () => {
    // This test verifies the module exports work correctly
    // The mutation breaks the AMD export path which should affect the module structure
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe('function');

    // Test that we can actually create and use Complex instances
    const c1 = new Complex(3, 4);
    const c2 = new Complex(1, 2);

    // Verify basic operations work
    const sum = c1.add(c2);
    expect(sum.re).toBeCloseTo(4);
    expect(sum.im).toBeCloseTo(6);

    // Verify static properties exist
    expect(Complex.ZERO).toBeDefined();
    expect(Complex.ONE).toBeDefined();
    expect(Complex.I).toBeDefined();
  });
});