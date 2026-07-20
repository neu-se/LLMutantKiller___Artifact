import * as path from "path";

describe("captureLine", () => {
  it("should return undefined without throwing when hasStacks is false", () => {
    // Patch Error so thrown errors have no stack property,
    // which will make hasStacks = false when the module initializes.
    const descriptor = Object.getOwnPropertyDescriptor(Error.prototype, "stack");

    Object.defineProperty(Error.prototype, "stack", {
      get() { return undefined; },
      configurable: true,
      enumerable: true,
    });

    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");

    // Clear the module from require cache to force re-evaluation
    delete require.cache[require.resolve(modulePath)];

    let loadError: Error | null = null;
    try {
      require(modulePath);
    } catch (e) {
      loadError = e as Error;
    } finally {
      // Restore original descriptor
      if (descriptor) {
        Object.defineProperty(Error.prototype, "stack", descriptor);
      }
      // Clean up cache again
      delete require.cache[require.resolve(modulePath)];
    }

    // Original code: captureLine returns early when !hasStacks, no error
    // Mutated code: captureLine falls through, tries e.stack.split() where e.stack is undefined -> TypeError
    expect(loadError).toBeNull();
  });
});