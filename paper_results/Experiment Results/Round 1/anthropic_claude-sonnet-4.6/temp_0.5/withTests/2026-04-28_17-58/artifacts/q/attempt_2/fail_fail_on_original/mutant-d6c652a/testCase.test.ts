import { createRequire } from "module";

describe("captureLine early return when hasStacks is false", () => {
  it("should not throw when hasStacks is false during module initialization", () => {
    // Temporarily patch Error so that thrown errors have no stack,
    // simulating an environment where hasStacks would be false.
    // Then require a fresh copy of the module (bypassing cache).
    const originalStack = Object.getOwnPropertyDescriptor(Error.prototype, "stack");
    
    // Remove stack traces from Error instances
    Object.defineProperty(Error.prototype, "stack", {
      get() { return undefined; },
      configurable: true,
    });

    let loadError: Error | null = null;
    try {
      const req = createRequire(import.meta.url);
      // Delete cached module to force re-evaluation
      delete req.cache[req.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      req("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      loadError = e as Error;
    } finally {
      // Restore original stack descriptor
      if (originalStack) {
        Object.defineProperty(Error.prototype, "stack", originalStack);
      } else {
        // @ts-ignore
        delete Error.prototype.stack;
      }
    }

    expect(loadError).toBeNull();
  });
});