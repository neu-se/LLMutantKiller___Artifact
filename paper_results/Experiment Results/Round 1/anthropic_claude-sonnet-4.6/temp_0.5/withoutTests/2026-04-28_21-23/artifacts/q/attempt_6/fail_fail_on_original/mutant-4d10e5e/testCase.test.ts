import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should not capture stack on deferred promise when Error has no stack", async () => {
    // Re-require the module after making Error.stack unavailable
    jest.resetModules();
    
    const originalDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, 'stack');
    Object.defineProperty(Error.prototype, 'stack', {
      get: () => undefined,
      configurable: true
    });
    
    let QFresh: any;
    try {
      QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(Error.prototype, 'stack', originalDescriptor);
      }
    }
    
    // With original code (hasStacks=false initially): hasStacks ends up false
    // (because e.stack is undefined), so captureLine returns undefined
    // With mutated code (hasStacks=true initially): hasStacks ends up false too
    // Both should behave the same... 
    
    QFresh.longStackSupport = true;
    const deferred = QFresh.defer();
    // In original: hasStacks=false, so no stack captured
    // In mutated: hasStacks=false (after try/catch), so no stack captured
    // Still the same!
    expect(deferred.promise.stack).toBeUndefined();
  });
});