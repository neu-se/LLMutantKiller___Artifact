// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex.js AMD export behavior", () => {
  it("should properly handle AMD module definition", () => {
    // The mutation changes the AMD export from functional to empty
    // This test verifies the AMD export path is working correctly

    // First verify basic functionality works
    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);

    // Now test the specific AMD behavior
    // In the original code, define.amd would be properly checked
    // In the mutated code, the AMD check is broken (empty block)
    const testDefine = {
      amd: true,
      called: false,
      args: null
    };

    // Simulate AMD environment
    const originalDefine = global.define;
    global.define = function(deps, factory) {
      testDefine.called = true;
      testDefine.args = { deps, factory };
      return Complex;
    };

    // Re-require to trigger the AMD path
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];
    const Complex2 = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Restore original define
    global.define = originalDefine;

    // In original code, define should have been called with proper arguments
    // In mutated code, define would not be called properly
    expect(testDefine.called).toBe(true);
    expect(testDefine.args.deps).toEqual([]);
    expect(typeof testDefine.args.factory).toBe('function');
    expect(testDefine.args.factory()).toBe(Complex);

    // Verify the re-required module still works
    const c2 = new Complex2(3, 4);
    expect(c2.re).toBe(3);
    expect(c2.im).toBe(4);
  });
});