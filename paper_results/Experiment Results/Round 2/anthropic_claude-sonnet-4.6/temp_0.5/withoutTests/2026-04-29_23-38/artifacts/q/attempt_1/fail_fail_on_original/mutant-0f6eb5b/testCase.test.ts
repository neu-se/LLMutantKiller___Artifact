import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport", () => {
  it("should have longStackSupport enabled by default (original behavior)", async () => {
    // In the original code, Q.longStackSupport is set to true unconditionally
    // In the mutated code, it remains false
    // When longStackSupport is true, deferred promises get a .stack property
    
    const deferred = Q.defer();
    
    // When longStackSupport is true, the promise should have a stack property
    expect(Q.longStackSupport).toBe(true);
  });
});