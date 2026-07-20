import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior when console.warn is unavailable", () => {
  it("should not throw when console.warn is not a function and a deprecated method is called", async () => {
    const originalWarn = console.warn;
    
    // Remove console.warn to simulate environment where it's not available
    // @ts-ignore
    delete console.warn;
    
    try {
      // Q.allResolved is decorated with deprecate(), so calling it triggers the deprecation warning path
      const result = await Q.allResolved([Q(1), Q(2)]);
      // Should succeed without throwing
      expect(result).toBeDefined();
    } finally {
      // Restore console.warn
      console.warn = originalWarn;
    }
  });
});