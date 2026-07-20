describe("hasStacks detection via module reload", () => {
  it("sets hasStacks=false when thrown errors have no stack, preventing long stack trace capture on deferred promises", () => {
    const OriginalError = global.Error;
    
    // Create a replacement Error that doesn't set stack on instances
    class NoStackError extends OriginalError {
      constructor(message?: string) {
        super(message);
        // Remove the stack property that V8 sets
        delete (this as any).stack;
      }
    }
    (global as any).Error = NoStackError;
    
    jest.resetModules();
    let Q2: any;
    try {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.Error = OriginalError;
    }
    
    Q2.longStackSupport = true;
    const deferred = Q2.defer();
    const hasPromiseStack = Object.prototype.hasOwnProperty.call(deferred.promise, 'stack');
    Q2.longStackSupport = false;
    
    // Original: try { throw new Error() } catch(e) { hasStacks = !!e.stack }
    //   → e.stack is undefined (deleted) → hasStacks = false → no stack on deferred
    // Mutated: try {} catch(e) { ... } (catch never runs)
    //   → hasStacks stays true → stack IS captured on deferred
    expect(hasPromiseStack).toBe(false);
  });
});