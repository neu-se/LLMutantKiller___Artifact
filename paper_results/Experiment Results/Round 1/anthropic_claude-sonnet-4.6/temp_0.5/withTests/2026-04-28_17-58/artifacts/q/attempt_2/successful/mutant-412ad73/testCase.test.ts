describe("Q bootstrap branch behavior", () => {
  it("should call bootstrap when bootstrap function is defined globally", () => {
    const globalAny = global as any;
    
    // Clear module cache
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    let bootstrapCalled = false;
    let bootstrapName: string | null = null;
    
    // Define global bootstrap function before requiring the module
    globalAny.bootstrap = function(name: string, _definition: Function) {
      bootstrapCalled = true;
      bootstrapName = name;
    };
    
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      delete globalAny.bootstrap;
      delete require.cache[modulePath];
    }
    
    // Original: if (typeof bootstrap === "function") => true => calls bootstrap
    // Mutant:   if (false) => skips bootstrap
    expect(bootstrapCalled).toBe(true);
    expect(bootstrapName).toBe("promise");
  });
});