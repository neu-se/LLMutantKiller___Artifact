import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should filter stack traces correctly without accessing out-of-bounds array elements", async () => {
    Q.longStackSupport = true;

    // Create a deep promise chain to generate meaningful stack traces
    // that will be processed by filterStackString via makeStackTraceLong
    const error = new Error("test rejection");
    
    let thrownError: any = null;

    // We need to trigger filterStackString which filters stack lines
    // The mutation causes i <= lines.length, accessing lines[lines.length] = undefined
    // then calling undefined.indexOf(...) throws TypeError
    const promise = Q.reject(error)
      .then(
        null,
        function rejectionHandler(err: Error) {
          // makeStackTraceLong is called here, which calls filterStackString
          // filterStackString iterates over stack lines
          // mutated: i <= lines.length accesses undefined, throws TypeError
          throw err; // re-throw to propagate
        }
      )
      .then(null, function(err) {
        thrownError = err;
        return "done";
      });

    await promise;

    // With original code: error.message is "test rejection" (no TypeError)
    // With mutated code: thrownError would be a TypeError about undefined.indexOf
    expect(thrownError).not.toBeNull();
    expect(thrownError.message).toBe("test rejection");
    expect(thrownError instanceof TypeError).toBe(false);

    Q.longStackSupport = false;
  });
});