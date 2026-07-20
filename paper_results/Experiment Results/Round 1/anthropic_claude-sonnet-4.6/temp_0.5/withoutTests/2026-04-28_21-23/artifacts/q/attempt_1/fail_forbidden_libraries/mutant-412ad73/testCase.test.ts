import { jest } from '@jest/globals';

describe("Q module bootstrap detection", () => {
  it("should call bootstrap when bootstrap is a function (Montage Require environment)", () => {
    // Save original module cache
    const originalBootstrap = (global as any).bootstrap;
    
    let bootstrapCalled = false;
    let bootstrapArgs: any[] = [];
    
    // Set up bootstrap as a function in global scope
    (global as any).bootstrap = function(name: string, definition: Function) {
      bootstrapCalled = true;
      bootstrapArgs = [name, definition];
    };
    
    // Clear module cache to force re-evaluation
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    try {
      require(modulePath);
      expect(bootstrapCalled).toBe(true);
      expect(bootstrapArgs[0]).toBe("promise");
    } finally {
      // Restore original state
      (global as any).bootstrap = originalBootstrap;
      delete require.cache[modulePath];
    }
  });
});