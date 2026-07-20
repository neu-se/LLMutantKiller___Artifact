import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
  it("should not alter error stack when promise has no stack but error is an object with longStackSupport", async () => {
    Q.longStackSupport = true;

    try {
      // Create a deferred and manually remove its stack so promise.stack is falsy
      const deferred = Q.defer();
      delete (deferred.promise as any).stack;

      // Create an error with a known stack
      const error = new Error("sentinel error");
      const originalStack = error.stack as string;

      // Ensure the original stack does NOT contain the long-stack separator
      expect(originalStack).not.toContain("From previous event:");

      deferred.reject(error);

      const caught: any = await deferred.promise.then(null, (e: any) => e);

      // Original: promise.stack is falsy => condition is false => stack unchanged
      // Mutated:  error is object => condition is true => makeStackTraceLong runs,
      //           appending "From previous event:" separator even though promise.stack is undefined
      expect(caught.stack).not.toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});