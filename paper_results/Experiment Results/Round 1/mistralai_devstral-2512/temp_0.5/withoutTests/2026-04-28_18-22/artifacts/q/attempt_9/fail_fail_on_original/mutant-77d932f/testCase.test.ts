const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should properly parse stack trace lines to identify file locations", () => {
    // Test the stack trace parsing by examining how errors are processed
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise that will generate a stack trace
      const promise = Q.reject(new Error("Test error"));

      // Get the stack trace
      const stackTrace = promise.stack;

      // The original getFileNameAndLineNumber should parse stack lines
      // The mutated version (empty function) would fail to parse them
      // We test this by checking for properly formatted stack lines
      // that include file:line information

      // Look for patterns that indicate successful parsing:
      // 1. Chrome/V8: "at function (file:line:column)"
      // 2. Node: "at file:line:column"
      // 3. Firefox: "@file:line"
      const hasParsedStackLines = stackTrace && (
        /\([^)]+:\d+:\d+\)/.test(stackTrace) ||  // Chrome/V8 pattern
        /at [^:]+:\d+:\d+/.test(stackTrace) ||   // Node pattern
        /@[^:]+:\d+$/.test(stackTrace)           // Firefox pattern
      );

      // In original code: should find parsed patterns (true)
      // In mutated code: might not find them (false)
      expect(hasParsedStackLines).toBe(true);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});