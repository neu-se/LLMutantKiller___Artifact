import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_create mutation detection", () => {
  it("should use Object.create when available, not the fallback function", () => {
    const originalCreate = Object.create;
    const calls: any[] = [];
    
    // Replace Object.create with a spy
    (Object as any).create = function(proto: any, descriptors?: PropertyDescriptorMap) {
      calls.push(proto);
      return originalCreate.call(Object, proto, descriptors);
    };
    
    try {
      // Reset module cache so Q re-evaluates object_create assignment
      jest.resetModules();
      // Re-require Q - it will now see our spy as Object.create
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Call Q2.defer() which internally calls object_create(defer.prototype)
      // and object_create(Promise.prototype)
      Q2.defer();
      
      // Original code: object_create = Object.create (our spy) → calls.length >= 2
      // Mutated code: object_create = fallback function → calls.length === 0
      expect(calls.length).toBeGreaterThan(0);
    } finally {
      Object.create = originalCreate;
      jest.resetModules();
    }
  });
});