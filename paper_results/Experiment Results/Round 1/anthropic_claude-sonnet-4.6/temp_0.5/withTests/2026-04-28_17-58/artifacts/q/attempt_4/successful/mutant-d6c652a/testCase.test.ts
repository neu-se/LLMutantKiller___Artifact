import * as path from "path";

describe("captureLine", () => {
  it("should not throw when hasStacks is false during module load", () => {
    const modulePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Clear cache
    delete require.cache[require.resolve(modulePath)];

    // Override Error so that new Error() instances have no stack,
    // simulating hasStacks = false
    const OriginalError = global.Error;
    
    function PatchedError(this: any, msg?: string) {
      const e = new OriginalError(msg);
      e.stack = undefined as any;
      Object.setPrototypeOf(e, PatchedError.prototype);
      return e;
    }
    PatchedError.prototype = Object.create(OriginalError.prototype);
    PatchedError.prototype.constructor = PatchedError;
    Object.setPrototypeOf(PatchedError, OriginalError);
    (global as any).Error = PatchedError;

    let loadError: Error | null = null;
    try {
      require(modulePath);
    } catch (e) {
      loadError = e as Error;
    } finally {
      (global as any).Error = OriginalError;
      delete require.cache[require.resolve(modulePath)];
    }

    // Original: returns early when !hasStacks, no throw
    // Mutated: falls through, e.stack.split() throws TypeError
    expect(loadError).toBeNull();
  });
});