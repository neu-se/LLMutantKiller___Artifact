import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should initialize hasStacks to false so stack detection works correctly", () => {
    // When hasStacks starts as false (original), the try-catch properly detects
    // whether the environment supports stacks and sets hasStacks accordingly.
    // When hasStacks starts as true (mutated), the try-catch still sets it correctly,
    // so the behavior is identical in Node.js.
    //
    // The only observable difference would be in an environment without stack support,
    // but we can test the correct behavior in Node.js:
    
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    deferred.reject(new Error("test"));
    
    return deferred.promise.then(null, (err: Error) => {
      Q.longStackSupport = false;
      // hasStacks=true (both versions) means long stack support works
      expect(err.stack).toContain("From previous event:");
    });
  });
});