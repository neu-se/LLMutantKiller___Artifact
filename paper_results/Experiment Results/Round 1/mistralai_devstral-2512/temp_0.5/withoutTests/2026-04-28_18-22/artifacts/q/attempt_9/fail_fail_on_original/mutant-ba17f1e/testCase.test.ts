const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Test the internal stack parsing by directly testing the getFileNameAndLineNumber function
    // We need to access it through the module's internal state

    // Get the internal function by evaluating the module code
    const fs = require('fs');
    const path = require('path');
    const qPath = path.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qCode = fs.readFileSync(qPath, 'utf8');

    // Extract the getFileNameAndLineNumber function
    const funcMatch = qCode.match(/function getFileNameAndLineNumber\(stackLine\) \{\s*([\s\S]*?)\s*^\s*}/m);
    if (!funcMatch) {
      throw new Error("Could not find getFileNameAndLineNumber function");
    }

    const getFileNameAndLineNumber = new Function('stackLine', funcMatch[0]);

    // Test with a stack line that matches the function name pattern
    const stackLine = "at TestFunction (/path/to/file.js:123:45)";
    const result = getFileNameAndLineNumber(stackLine);

    // The original code should return [filename, lineNumber]
    // The mutated code returns an empty array
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toBe("/path/to/file.js");
    expect(result[1]).toBe(123);
  });
});