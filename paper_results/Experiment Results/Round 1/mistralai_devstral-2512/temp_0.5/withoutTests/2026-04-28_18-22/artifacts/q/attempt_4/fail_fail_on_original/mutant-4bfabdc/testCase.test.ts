const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation test", () => {
  it("should correctly filter internal frames from stack traces", () => {
    // Create a scenario that will generate a stack trace with internal frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Manually set up a stack trace that includes internal Q frames
    error.stack = `
Error: Test error
    at Test.<anonymous> (test.js:10:15)
    at filterStackString (q.js:123:20)
    at makeStackTraceLong (q.js:150:15)
    at Promise.promiseDispatch (q.js:200:25)
    at nextTick (q.js:50:10)
    at process._tickCallback (node.js:123:25)
    at Module.runMain (module.js:100:11)
`;

    // Use Q's internal stack filtering
    const filteredStack = Q.filterStackString(error.stack);

    // In the original code, internal Q frames should be filtered out
    // In the mutated code (with || instead of &&), the filtering logic changes
    // and should incorrectly keep some internal frames
    const hasInternalFrames = filteredStack.includes("filterStackString") ||
                              filteredStack.includes("makeStackTraceLong") ||
                              filteredStack.includes("promiseDispatch");

    // Original: should filter out internal frames (false)
    // Mutated: should incorrectly keep some internal frames (true)
    expect(hasInternalFrames).toBe(false);
  });
});