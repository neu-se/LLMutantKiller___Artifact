describe("Q hasStacks initialization", () => {
  it("correctly detects stack support by throwing an error during initialization", () => {
    jest.resetModules();
    
    const originalError = global.Error;
    
    // Override Error so instances don't have .stack
    class NoStackError extends Error {
      constructor(message?: string) {
        super(message);
        delete (this as any).stack;
      }
    }
    // Make it so Error instances have no stack
    const stackDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, 'stack');
    Object.defineProperty(Error.prototype, 'stack', {
      get() { return undefined; },
      configurable: true,
    });
    
    let Q2: any;
    try {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      if (stackDescriptor) {
        Object.defineProperty(Error.prototype, 'stack', stackDescriptor);
      }
    }
    
    Q2.longStackSupport = true;
    const deferred = Q2.defer();
    
    // Original: catch runs, hasStacks = !!undefined = false → promise.stack not set
    // Mutated: catch never runs, hasStacks = true → promise.stack IS set
    expect(deferred.promise.stack).toBeUndefined();
    
    jest.resetModules();
  });
});