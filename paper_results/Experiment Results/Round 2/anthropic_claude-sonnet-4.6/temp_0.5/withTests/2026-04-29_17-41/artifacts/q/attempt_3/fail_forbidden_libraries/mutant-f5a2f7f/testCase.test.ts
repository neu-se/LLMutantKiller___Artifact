import { jest } from "@jest/globals";

describe("captureLine mutation detection", () => {
  it("module loads without error when Error has no stack property", () => {
    const OriginalError = global.Error;
    
    // Simulate environment where errors have no stack
    class NoStackError extends OriginalError {
      constructor(message?: string) {
        super(message);
        delete (this as any).stack;
      }
    }
    (global as any).Error = NoStackError;
    
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    let loadError: Error | null = null;
    try {
      require(modulePath);
    } catch (e) {
      loadError = e as Error;
    }
    
    // Restore
    (global as any).Error = OriginalError;
    delete require.cache[modulePath];
    
    // Original code: if (!hasStacks) return; → safe, returns undefined
    // Mutated code: if (false) → tries e.stack.split("\n") where stack is undefined → TypeError
    expect(loadError).toBeNull();
  });
});