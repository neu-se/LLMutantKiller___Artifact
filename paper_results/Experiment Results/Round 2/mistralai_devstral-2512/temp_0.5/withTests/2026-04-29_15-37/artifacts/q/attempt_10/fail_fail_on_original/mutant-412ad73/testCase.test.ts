// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should properly handle Montage environment detection", () => {
    // Store original bootstrap if it exists
    const globalAny = global as any;
    const originalBootstrap = globalAny.bootstrap;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Set up a mock bootstrap function that will throw if called
    globalAny.bootstrap = function() {
      throw new Error("Bootstrap should not be called in this test");
    };

    // Set up environment to force Montage path
    globalAny.window = undefined;
    globalAny.self = undefined;

    // Clear the module cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // In original code, this should throw because bootstrap is called
    // In mutated code (with "if (false)"), this should not throw
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).toThrow("Bootstrap should not be called in this test");

    // Clean up
    globalAny.bootstrap = originalBootstrap;
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
  });
});