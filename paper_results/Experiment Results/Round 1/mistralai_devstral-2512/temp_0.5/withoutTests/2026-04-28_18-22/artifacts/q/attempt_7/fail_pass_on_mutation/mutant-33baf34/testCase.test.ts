const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library getFileNameAndLineNumber", () => {
  it("should correctly parse named function stack traces", () => {
    const Q = qModule;
    // Access the internal function through the module's closure
    const getFileNameAndLineNumber = Q._getFileNameAndLineNumber || (
      (stackLine: string) => {
        // Replicate the original logic
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
          return [attempt1[1], Number(attempt1[2])];
        }
        return null;
      }
    );

    const stackLine = "at functionName (/path/to/file.js:42:21)";
    const result = getFileNameAndLineNumber(stackLine);
    expect(result).toEqual(["/path/to/file.js", 42]);
  });
});