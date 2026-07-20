describe("Q module loading", () => {
  it("should load successfully without throwing an error", () => {
    // Clear module cache to ensure fresh load
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    let Q: any;
    expect(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).not.toThrow();
    
    expect(typeof Q).toBe("function");
  });
});