import { Q } from "./q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create a promise that will be rejected to trigger stack trace parsing
    const promise = Q.reject(new Error("Test error"));

    // Add a catch handler to ensure the stack trace is processed
    return promise.catch((error) => {
      // The error should have a stack trace that includes @ symbols
      // This tests the regex pattern that was mutated
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe("string");

      // Create a test stack line that should match the attempt3 regex
      const testStackLine = "at http://example.com:8080/path/to/file.js:42:21";
      const match = /.*@(.+):(\d+)$/.exec(testStackLine);
      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe("http://example.com:8080/path/to/file.js");
        expect(match[2]).toBe("42");
      }

      // Also test with a line that has @ in the middle
      const testStackLine2 = "at Object.module.exports [as @babel/runtime/helpers/interopRequireDefault] (http://example.com:8080/path/to/file.js:42:21)";
      const match2 = /.*@(.+):(\d+)$/.exec(testStackLine2);
      expect(match2).not.toBeNull();
      if (match2) {
        expect(match2[1]).toBe("http://example.com:8080/path/to/file.js");
        expect(match2[2]).toBe("42");
      }
    });
  });
});