import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should resolve promises correctly with longStackSupport enabled", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    // With longStackSupport and hasStacks=true, promise.stack should be a string
    // This tests that the stack was captured during defer()
    expect(typeof deferred.promise.stack).toBe("string");
    expect(deferred.promise.stack.length).toBeGreaterThan(0);
    
    Q.longStackSupport = false;
  });
});