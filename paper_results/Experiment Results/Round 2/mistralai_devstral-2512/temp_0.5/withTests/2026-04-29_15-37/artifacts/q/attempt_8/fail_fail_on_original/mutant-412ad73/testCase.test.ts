// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library bootstrap behavior", () => {
  it("should call bootstrap when available in Montage environment", () => {
    // Store original bootstrap if it exists
    const globalAny = global as any;
    const originalBootstrap = globalAny.bootstrap;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Set up a flag to track if bootstrap was called
    let bootstrapWasCalled = false;

    // Set up a mock bootstrap function
    globalAny.bootstrap = function(type: string, definition: any) {
      bootstrapWasCalled = true;
    };

    // Remove window and self to prevent browser path from being taken
    globalAny.window = undefined;
    globalAny.self = undefined;

    // Clear the module cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, bootstrap should be called
    // In mutated code (with "if (false)"), bootstrap won't be called
    expect(bootstrapWasCalled).toBe(true);

    // Clean up
    globalAny.bootstrap = originalBootstrap;
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
  });
});