// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7644a72/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return behavior", () => {
  it("should use ReturnValue when available and internal QReturnValue when not", () => {
    // Test 1: When ReturnValue is defined, it should be used
    function ReturnValue(value: any) {
      this.value = value;
      this.isReturnValue = true;
    }
    (global as any).ReturnValue = ReturnValue;

    // Force re-evaluation of the Q module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const testValue = "test";
    try {
      freshQ["return"](testValue);
      fail("Expected Q.return to throw");
    } catch (e: any) {
      // In original code, when ReturnValue is defined, it should use ReturnValue
      // In mutated code, it will always use the internal QReturnValue
      expect(e.isReturnValue).toBe(true);
      expect(e.value).toBe(testValue);
    }

    // Clean up
    delete (global as any).ReturnValue;
  });
});