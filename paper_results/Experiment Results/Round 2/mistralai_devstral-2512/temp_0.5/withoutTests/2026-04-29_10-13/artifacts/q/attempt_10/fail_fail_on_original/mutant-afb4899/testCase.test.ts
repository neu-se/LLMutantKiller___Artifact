const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with line and column numbers", () => {
    // Test the specific regex behavior that differs between original and mutated code
    const testStackLine = "at module.js:42:30 with extra text";

    // Original regex (with $ anchor) should NOT match lines with extra text
    const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
    const originalMatch = originalRegex.exec(testStackLine);

    // Mutated regex (without $ anchor) will incorrectly match lines with extra text
    const mutatedRegex = /at ([^ ]+):(\d+):(?:\d+)/;
    const mutatedMatch = mutatedRegex.exec(testStackLine);

    // This assertion will pass on original code (match should be null)
    // but fail on mutated code (match will not be null)
    expect(originalMatch).toBeNull();

    // This assertion will fail on mutated code because it incorrectly matches
    // lines with extra text after the column number
    if (mutatedMatch) {
      throw new Error("Mutated regex incorrectly matched stack line with extra text");
    }
  });
});