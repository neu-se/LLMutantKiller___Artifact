import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module mutation detection", () => {
  it("should resolve a simple promise and Q module should load without errors", async () => {
    // If the mutation causes captureLine to throw (when fileNameAndLineNumber is null),
    // the module would fail to load. We verify basic functionality works.
    // Additionally, test that Q.resolve works correctly to ensure the module
    // initialized properly with correct line numbers for stack filtering.
    const result = await Q.resolve(42);
    expect(result).toBe(42);
    
    // Test that rejected promises work (uses stack trace filtering)
    const rejection = Q.reject(new Error("test error"));
    const reason = await rejection.then(null, (err: Error) => err);
    expect(reason.message).toBe("test error");
  });
});