// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7644a72/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return behavior", () => {
  it("should use QReturnValue when ReturnValue is defined", () => {
    // Define a mock ReturnValue class to simulate the environment
    function ReturnValue(value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = ReturnValue;

    // Force re-evaluation of the Q module to pick up the new ReturnValue
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Test that Q.return creates a QReturnValue instance (which should be ReturnValue when defined)
    const testValue = "test";
    try {
      freshQ["return"](testValue);
      fail("Expected Q.return to throw");
    } catch (e: any) {
      // In original code, when ReturnValue is defined, QReturnValue should be ReturnValue
      // In mutated code, QReturnValue will always be the internal fallback
      expect(e.constructor.name).toBe("ReturnValue");
      expect(e.value).toBe(testValue);
    }

    // Clean up
    delete (global as any).ReturnValue;
  });
});