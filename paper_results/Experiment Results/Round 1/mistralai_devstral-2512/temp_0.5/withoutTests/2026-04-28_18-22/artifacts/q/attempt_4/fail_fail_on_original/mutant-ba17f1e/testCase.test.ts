const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack trace lines with function names", () => {
    // Access the internal function through the Q module
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q");
    const getFileNameAndLineNumber = qModule.__test_getFileNameAndLineNumber ||
      (() => {
        // Extract the function from the module if not directly exported
        const moduleCode = require('fs').readFileSync("../../../../../../../../../../../subject_repositories/q/q.js", 'utf8');
        const match = moduleCode.match(/function getFileNameAndLineNumber\(([\s\S]*?)^\s*}/m);
        if (match) {
          return new Function('stackLine', match[0]);
        }
        throw new Error("Could not extract getFileNameAndLineNumber function");
      })();

    // Test a stack line with function name pattern
    const stackLine = "at functionName (/path/to/file.js:42:21)";
    const result = getFileNameAndLineNumber(stackLine);

    // Should return filename and line number, not an empty array
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toBe("/path/to/file.js");
    expect(result[1]).toBe(42);
  });
});