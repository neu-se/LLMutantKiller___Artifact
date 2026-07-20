// Test case to detect the mutation in q.js where the Montage Require bootstrap check is disabled
declare const bootstrap: any;

describe("Q module loading behavior", () => {
  it("should properly handle Montage Require bootstrap when available", () => {
    // This test verifies that the Montage Require bootstrap path is functional
    // The mutation changes the bootstrap check from `if (typeof bootstrap === "function")`
    // to `if (false)`, which should prevent Montage bootstrap from working

    // Create a mock bootstrap function to simulate Montage environment
    (global as any).bootstrap = function(moduleName: string, definition: any) {
      if (moduleName === "promise") {
        const Q = definition();
        // In Montage, bootstrap should return the module
        return Q;
      }
      throw new Error("Unexpected module name");
    };

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // Create a spy to track if bootstrap was called
    const originalBootstrap = (global as any).bootstrap;
    let bootstrapCalled = false;
    (global as any).bootstrap = function(...args: any[]) {
      bootstrapCalled = true;
      return originalBootstrap.apply(this, args);
    };

    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, bootstrap should be called when available
    // In the mutated code, bootstrap should NOT be called
    expect(bootstrapCalled).toBe(true);

    // When bootstrap is used, Q should be the returned module object
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("object");
    expect(Q.Q).toBeDefined();
    expect(typeof Q.Q).toBe("function");

    // Verify basic Q functionality works through the module
    return Q.Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
    });
  });
});