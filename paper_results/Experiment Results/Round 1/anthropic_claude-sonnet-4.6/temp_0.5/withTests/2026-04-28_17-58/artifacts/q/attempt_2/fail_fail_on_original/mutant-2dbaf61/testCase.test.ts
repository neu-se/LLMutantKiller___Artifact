import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks detection", () => {
  it("detects hasStacks by throwing an error, so removing stack from Error affects behavior", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, 'stack');
    
    // Make Error objects not have stacks
    Object.defineProperty(Error.prototype, 'stack', {
      get: () => undefined,
      configurable: true,
      enumerable: true,
    });
    
    jest.resetModules();
    
    let Q2: any;
    try {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(Error.prototype, 'stack', originalDescriptor);
      }
    }
    
    Q2.longStackSupport = true;
    const deferred = Q2.defer();
    const hasPromiseStack = 'stack' in deferred.promise;
    Q2.longStackSupport = false;
    
    // Original: hasStacks=false (catch ran, e.stack=undefined) → no stack on deferred
    // Mutated: hasStacks=true (catch never ran) → stack on deferred
    expect(hasPromiseStack).toBe(false);
  });
});