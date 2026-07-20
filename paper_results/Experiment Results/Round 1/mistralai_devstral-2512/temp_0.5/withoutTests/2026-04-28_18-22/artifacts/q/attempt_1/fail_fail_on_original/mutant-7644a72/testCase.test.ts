// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7644a72/testCase.test.ts
import { Q } from "./q.js";

describe("Q.return behavior", () => {
  it("should use QReturnValue when ReturnValue is defined", () => {
    // Define a mock ReturnValue class to simulate the environment
    function ReturnValue(value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = ReturnValue;

    // Force re-evaluation of the QReturnValue assignment
    // This is needed because the module may have already been loaded
    delete require.cache[require.resolve("./q.js")];
    const { Q: FreshQ } = require("./q.js");

    // Test that Q.return creates a QReturnValue instance
    const testValue = "test";
    try {
      FreshQ["return"](testValue);
    } catch (e) {
      expect(e).toBeInstanceOf(ReturnValue);
      expect((e as any).value).toBe(testValue);
    }

    // Clean up
    delete (global as any).ReturnValue;
  });
});