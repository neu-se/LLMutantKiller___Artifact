// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with single-digit column numbers", () => {
    // Create a mock stack trace with single-digit column number
    const mockStackLine = "at test.js:10:5";

    // Access the internal function to test the regex directly
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const getFileNameAndLineNumber = qModule.__getFileNameAndLineNumber || (() => {
      // Extract the function from the module if not exported
      const moduleCode = require('fs').readFileSync("../../../../../../../../../../../subject_repositories/q/q.js", 'utf8');
      const match = moduleCode.match(/function getFileNameAndLineNumber\(([\s\S]*?)^\s*}/m);
      if (match) {
        return new Function('stackLine', match[0]);
      }
      throw new Error("Could not extract getFileNameAndLineNumber function");
    })();

    // Test the regex pattern directly
    const result = getFileNameAndLineNumber(mockStackLine);
    expect(result).toEqual(["test.js", 10]);
  });
});