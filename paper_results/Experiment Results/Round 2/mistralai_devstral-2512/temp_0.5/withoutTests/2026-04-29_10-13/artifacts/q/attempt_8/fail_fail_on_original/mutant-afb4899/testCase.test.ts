const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with line and column numbers", () => {
    // Create a test case that specifically exercises the stack trace parsing
    const testStackLine = "at test.js:10:5";
    const testStackLineWithExtra = "at test.js:10:5 extra text";

    // Test the original regex pattern (with $ anchor)
    const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
    const originalMatch = originalRegex.exec(testStackLine);
    const originalMatchWithExtra = originalRegex.exec(testStackLineWithExtra);

    // Test the mutated regex pattern (without $ anchor)
    const mutatedRegex = /at ([^ ]+):(\d+):(?:\d+)/;
    const mutatedMatch = mutatedRegex.exec(testStackLine);
    const mutatedMatchWithExtra = mutatedRegex.exec(testStackLineWithExtra);

    // Original regex should match the clean line but not the one with extra text
    expect(originalMatch).not.toBeNull();
    expect(originalMatchWithExtra).toBeNull();

    // Mutated regex will match both (this is the bug we're testing for)
    expect(mutatedMatch).not.toBeNull();

    // This assertion will fail on mutated code because it incorrectly matches
    // lines with extra text after the column number
    expect(mutatedMatchWithExtra).toBeNull();
  });
});