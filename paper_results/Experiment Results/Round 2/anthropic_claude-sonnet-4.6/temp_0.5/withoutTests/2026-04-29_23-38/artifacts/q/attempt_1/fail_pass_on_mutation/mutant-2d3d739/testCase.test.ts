import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation detection", () => {
  it("should handle long stack traces without throwing when object_defineProperty is properly defined", async () => {
    Q.longStackSupport = true;

    const originalError = new Error("original error");
    
    // Create a rejected promise chain that will trigger makeStackTraceLong
    // makeStackTraceLong calls object_defineProperty - if it's `false`, it will throw
    const result = await Q.reject(originalError)
      .then(null, function(err) {
        // If object_defineProperty is false, makeStackTraceLong would have thrown
        // and the rejection handler would receive a different error
        return "caught: " + err.message;
      });

    expect(result).toBe("caught: original error");
  });
});