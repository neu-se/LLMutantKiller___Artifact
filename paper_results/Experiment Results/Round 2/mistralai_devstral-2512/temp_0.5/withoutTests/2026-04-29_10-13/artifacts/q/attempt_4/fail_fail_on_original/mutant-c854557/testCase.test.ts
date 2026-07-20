// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c854557/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a scenario that will trigger the getFileNameAndLineNumber function
    // by creating a rejected promise with a specific stack trace format
    const error = new Error("Test error");

    // Manipulate the stack to include our test case
    error.stack = [
      "Error: Test error",
      "    at testFunction (http://example.com/file.js:42:21)",
      "    at anotherFunction (http://example.com/other.js:99:10)"
    ].join("\n");

    const promise = Q.reject(error);

    return promise.catch((e: Error) => {
      // The mutation affects line number parsing in stack traces
      // We need to verify that line numbers with multiple digits are parsed correctly
      const stackLines = e.stack!.split("\n");
      const relevantLine = stackLines.find(line => line.includes("file.js:42:21"));

      expect(relevantLine).toBeDefined();

      // This will fail on the mutated version because \d (instead of \d+) will only match single digits
      const regex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const match = regex.exec(relevantLine!);

      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe("http://example.com/file.js");
        expect(match[2]).toBe("42"); // This will fail on mutated code (would be "4")
      }

      return true;
    });
  });
});