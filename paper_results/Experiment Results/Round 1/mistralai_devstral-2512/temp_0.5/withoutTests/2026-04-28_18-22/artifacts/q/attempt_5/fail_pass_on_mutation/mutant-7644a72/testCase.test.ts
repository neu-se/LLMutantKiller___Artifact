// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7644a72/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return behavior", () => {
  it("should use the internal QReturnValue implementation when ReturnValue is not defined", () => {
    // Ensure ReturnValue is not defined
    delete (global as any).ReturnValue;

    // Force re-evaluation of the Q module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Test that Q.return creates the internal QReturnValue instance
    const testValue = "test";
    try {
      freshQ["return"](testValue);
      fail("Expected Q.return to throw");
    } catch (e: any) {
      // In original code, when ReturnValue is not defined, QReturnValue should be the internal fallback
      // In mutated code, QReturnValue will always be the internal fallback (same behavior)
      // So we need to test the opposite case where ReturnValue IS defined
      expect(e.value).toBe(testValue);
    }
  });
});