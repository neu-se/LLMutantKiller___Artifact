// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7644a72/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return behavior", () => {
  it("should use QReturnValue when ReturnValue is defined", () => {
    // Define a mock ReturnValue class to simulate the environment
    function ReturnValue(value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = ReturnValue;

    // Test that Q.return creates a QReturnValue instance
    const testValue = "test";
    try {
      Q["return"](testValue);
      fail("Expected Q.return to throw QReturnValue");
    } catch (e) {
      expect(e.constructor.name).toBe("ReturnValue");
      expect((e as any).value).toBe(testValue);
    }

    // Clean up
    delete (global as any).ReturnValue;
  });
});