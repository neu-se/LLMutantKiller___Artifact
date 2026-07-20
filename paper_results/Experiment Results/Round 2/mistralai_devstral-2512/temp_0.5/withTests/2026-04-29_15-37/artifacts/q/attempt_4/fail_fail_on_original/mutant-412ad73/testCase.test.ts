// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library bootstrap behavior", () => {
  it("should call bootstrap when available in Montage environment", () => {
    // Create a mock bootstrap function to simulate Montage environment
    const globalAny = global as any;
    const originalBootstrap = globalAny.bootstrap;
    let bootstrapCalled = false;

    // Set up a mock bootstrap function
    globalAny.bootstrap = function(type: string, definition: any) {
      bootstrapCalled = true;
      expect(type).toBe("promise");
      expect(typeof definition).toBe("function");
    };

    // Clear the module cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify the bootstrap was called
    expect(bootstrapCalled).toBe(true);

    // Clean up
    globalAny.bootstrap = originalBootstrap;
  });
});