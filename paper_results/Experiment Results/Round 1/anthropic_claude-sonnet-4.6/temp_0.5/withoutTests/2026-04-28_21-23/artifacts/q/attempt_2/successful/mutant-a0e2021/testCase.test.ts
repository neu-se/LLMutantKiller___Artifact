describe("Q module initialization", () => {
  it("should load without throwing when process.env is not available", () => {
    const originalEnv = process.env;
    
    try {
      // @ts-ignore
      delete process.env;
      
      expect(() => {
        const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
        delete require.cache[modulePath];
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      }).not.toThrow();
    } finally {
      process.env = originalEnv;
    }
  });
});