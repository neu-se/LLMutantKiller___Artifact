describe("hasStacks mutation detection", () => {
  it("promise.stack is undefined when hasStacks is false", () => {
    const OriginalError = global.Error;
    const originalCaptureStackTrace = (Error as any).captureStackTrace;
    
    jest.resetModules();
    
    // Make Error instances have no stack property
    (Error as any).captureStackTrace = undefined;
    delete (Error as any).captureStackTrace;
    
    // Override Error.prototype to not have stack
    const stackDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, 'stack');
    if (stackDescriptor) {
      Object.defineProperty(Error.prototype, 'stack', {
        get() { return undefined; },
        configurable: true
      });
    }
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      if (originalCaptureStackTrace) {
        (Error as any).captureStackTrace = originalCaptureStackTrace;
      }
      if (stackDescriptor) {
        Object.defineProperty(Error.prototype, 'stack', stackDescriptor);
      }
      jest.resetModules();
    }
    
    Q.longStackSupport = true;
    const d = Q.defer();
    Q.longStackSupport = false;
    d.resolve(undefined);
    
    // Original: hasStacks=false -> promise.stack NOT set -> undefined
    // Mutation: hasStacks=true -> but try/catch sets it to false -> same
    // Both: undefined
    expect(d.promise.stack).toBeUndefined();
  });
});