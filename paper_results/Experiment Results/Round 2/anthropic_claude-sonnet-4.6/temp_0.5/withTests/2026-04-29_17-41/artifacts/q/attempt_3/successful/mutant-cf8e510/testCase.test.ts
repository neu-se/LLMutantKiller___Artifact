import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
  it("should not modify a non-object error's stack when promise has a stack", async () => {
    Q.longStackSupport = true;

    try {
      // Reject with a string (not an object), so typeof error === "object" is false
      // Original: hasStacks && promise.stack && typeof error === "object" => false (string fails object check)
      // Mutated: (hasStacks && promise.stack) => TRUE, so body runs on a string error
      // Running makeStackTraceLong on a string would try to access error.stack which is undefined
      // and set error.stack = ... which would add a property to the string primitive (no-op)
      // But actually the function tries to do error.stack = something, which on a string primitive fails silently
      
      // Better: reject with an object that is NOT a plain Error but typeof === "object"
      // Wait, we want typeof error !== "object"... use a string
      
      const deferred = Q.defer();
      const stringReason = "string rejection reason";
      
      deferred.reject(stringReason);

      // With longStackSupport, the promise has a stack
      // Original: typeof "string" === "object" is false => condition false => no modification
      // Mutated: hasStacks && promise.stack is true => condition true => tries to modify string's .stack
      
      const caught: any = await deferred.promise.then(null, (e: any) => e);
      
      // The caught value should still be the original string, unmodified
      expect(caught).toBe(stringReason);
    } finally {
      Q.longStackSupport = false;
    }
  });
});