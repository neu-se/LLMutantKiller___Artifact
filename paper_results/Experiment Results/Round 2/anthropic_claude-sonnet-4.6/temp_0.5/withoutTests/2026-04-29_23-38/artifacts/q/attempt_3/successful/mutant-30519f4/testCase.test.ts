import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should not resolve when a pending promise has not yet resolved", async () => {
    const deferred = Q.defer();
    
    // This promise is pending and will never be resolved in this test
    const pending = deferred.promise;
    
    let resolved = false;
    let resolvedValue: any = null;
    
    Q.all([pending]).then(function(value) {
      resolved = true;
      resolvedValue = value;
    });
    
    // Wait a few ticks to let any microtasks/async operations settle
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // With original code: pending promise causes pendingCount=1, never resolves -> resolved stays false
    // With mutated code: pending enters if-branch (state !== "fulfilled" is true for pending),
    //   sets promises[0] = undefined, pendingCount stays 0, resolves immediately -> resolved becomes true
    expect(resolved).toBe(false);
  });
});