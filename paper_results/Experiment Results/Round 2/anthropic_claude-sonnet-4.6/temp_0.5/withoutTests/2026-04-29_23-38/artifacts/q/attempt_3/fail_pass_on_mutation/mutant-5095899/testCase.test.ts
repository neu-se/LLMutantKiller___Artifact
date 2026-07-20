describe("Q module loading and basic functionality", () => {
  it("should provide a working Q function after module load", () => {
    // Force fresh module load by clearing cache
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    // Temporarily ensure self is defined (simulating browser-like env where self exists)
    // In Node >= 21, self is globalThis. We need to test the branch condition.
    // The key: original uses self !== "undefined" (true when self exists)
    //          mutated uses self === "undefined" (false when self exists) -> throws
    
    const g = global as any;
    const hadSelf = "self" in g;
    const prevSelf = g.self;
    
    // Ensure self is defined so original code enters the branch
    if (!hadSelf) {
      g.self = g;
    }
    
    let threwError = false;
    try {
      delete require.cache[modulePath];
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      threwError = true;
    } finally {
      if (!hadSelf) {
        delete g.self;
      } else {
        g.self = prevSelf;
      }
    }
    
    expect(threwError).toBe(false);
  });
});