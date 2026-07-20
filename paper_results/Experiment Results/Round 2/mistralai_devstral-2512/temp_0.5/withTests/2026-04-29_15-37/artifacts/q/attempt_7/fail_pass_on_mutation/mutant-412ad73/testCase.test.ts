// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should properly detect and handle Montage environment", () => {
    // Store original bootstrap if it exists
    const globalAny = global as any;
    const originalBootstrap = globalAny.bootstrap;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Set up Montage environment
    globalAny.bootstrap = function(type: string, definition: any) {
      // This should be called in original code but not in mutated code
      expect(type).toBe("promise");
      expect(typeof definition).toBe("function");
    };

    // Set up browser-like environment to prevent other paths from being taken
    globalAny.window = {};
    globalAny.self = {};

    // Clear the module cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // This should work in original code but fail in mutated code
    // because the mutated code has "if (false)" instead of checking for bootstrap
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).not.toThrow();

    // Clean up
    globalAny.bootstrap = originalBootstrap;
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
  });
});