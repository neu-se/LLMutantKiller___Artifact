import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong operator precedence", () => {
  it("should not corrupt non-object rejection reasons when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    // Create a chain so that promise.stack is populated
    const deferred = Q.defer();
    
    const result = await deferred.promise
      .then(() => "should not reach")
      .then(null, (err) => {
        // err should be exactly the string we rejected with
        return err;
      });

    // Reject with a plain string (not an object)
    // Original: typeof error === "object" is false, so makeStackTraceLong skips
    // Mutated: hasStacks && promise.stack is true, so it enters and tries to modify a string
    deferred.reject("plain string error");

    // Wait for resolution
    const finalResult = await result;
    expect(finalResult).toBe("plain string error");
  });
});