import { createRequire } from "module";

describe("Q hasStacks initialization via thrown error", () => {
  it("sets hasStacks to false when Error has no stack, affecting longStackSupport behavior", () => {
    // Remove stack property from Error prototype to simulate environment without stacks
    const originalDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, "stack");
    
    try {
      // Delete stack support
      Object.defineProperty(Error.prototype, "stack", {
        get: () => undefined,
        configurable: true,
      });
      
      jest.resetModules();
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      Q2.longStackSupport = true;
      const deferred = Q2.defer();
      
      // Original: hasStacks=false → promise.stack NOT set even with longStackSupport=true
      // Mutated: hasStacks=true → promise.stack IS set
      expect(deferred.promise.stack).toBeUndefined();
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(Error.prototype, "stack", originalDescriptor);
      } else {
        delete (Error.prototype as any).stack;
      }
      jest.resetModules();
    }
  });
});