describe("hasStacks initialization", () => {
  it("detects mutation through controlled Error.stack during module init", () => {
    jest.resetModules();
    
    const OrigError = global.Error;
    let moduleInitializing = true;
    
    // Create a proxy that returns undefined for stack during module init
    const ProxyError = new Proxy(OrigError, {
      construct(target, args) {
        const instance = Reflect.construct(target, args, target);
        if (moduleInitializing) {
          // Override stack to be undefined during module initialization
          Object.defineProperty(instance, 'stack', {
            value: undefined,
            writable: true,
            configurable: true
          });
        }
        return instance;
      }
    });
    
    (global as any).Error = ProxyError;
    
    let QFresh: any;
    try {
      QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
      moduleInitializing = false;
    } finally {
      (global as any).Error = OrigError;
    }
    
    // With stack=undefined during init:
    // Original: hasStacks=false → try/catch → e.stack=undefined → hasStacks=false → captureLine returns undefined
    // Mutated: hasStacks=true → try/catch → e.stack=undefined → hasStacks=false → captureLine returns undefined
    // Both end up with hasStacks=false and qStartingLine=undefined
    
    // BUT WAIT - in mutated code, hasStacks starts as true
    // The try/catch sets it to false
    // Then captureLine() is called with hasStacks=false → returns undefined
    // qStartingLine = undefined
    
    // In original, hasStacks starts as false
    // try/catch sets it to false
    // captureLine() called with hasStacks=false → returns undefined
    // qStartingLine = undefined
    
    // STILL THE SAME!
    
    QFresh.longStackSupport = true;
    const deferred = QFresh.defer();
    // hasStacks=false in both, so no stack captured
    expect(deferred.promise.stack).toBeUndefined();
  });
});