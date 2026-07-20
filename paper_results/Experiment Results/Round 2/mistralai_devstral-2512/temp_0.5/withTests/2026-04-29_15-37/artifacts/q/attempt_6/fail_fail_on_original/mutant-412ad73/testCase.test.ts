// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library bootstrap detection", () => {
  it("should detect bootstrap function when available", () => {
    // Store original bootstrap if it exists
    const globalAny = global as any;
    const originalBootstrap = globalAny.bootstrap;

    // Create a spy to track bootstrap calls
    let bootstrapSpy = {
      called: false,
      callCount: 0,
      args: [] as any[]
    };

    // Set up a mock bootstrap function
    globalAny.bootstrap = function(type: string, definition: any) {
      bootstrapSpy.called = true;
      bootstrapSpy.callCount++;
      bootstrapSpy.args.push({ type, definition });
    };

    // Clear the module cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QReloaded = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify bootstrap was called with correct arguments
    expect(bootstrapSpy.called).toBe(true);
    expect(bootstrapSpy.callCount).toBe(1);
    expect(bootstrapSpy.args[0].type).toBe("promise");
    expect(typeof bootstrapSpy.args[0].definition).toBe("function");

    // Verify Q still works correctly
    expect(QReloaded.defer).toBeDefined();
    const deferred = QReloaded.defer();
    expect(deferred.resolve).toBeDefined();

    // Clean up
    globalAny.bootstrap = originalBootstrap;
  });
});