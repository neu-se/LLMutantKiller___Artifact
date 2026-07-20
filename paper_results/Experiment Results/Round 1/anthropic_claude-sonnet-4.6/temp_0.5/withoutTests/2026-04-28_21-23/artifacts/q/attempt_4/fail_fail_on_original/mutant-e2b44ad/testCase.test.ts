import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done with process.domain", () => {
  it("calls process.domain.bind synchronously when domain exists", () => {
    let bindCallCount = 0;

    const fakeDomain = {
      bind: (fn: Function) => {
        bindCallCount++;
        return fn;
      }
    };

    const originalDescriptor = Object.getOwnPropertyDescriptor(process, "domain");
    
    // Check if we can redefine
    if (!originalDescriptor || !originalDescriptor.configurable) {
      // Try to make it configurable
      Object.defineProperty(process, "domain", {
        get: () => fakeDomain,
        configurable: true,
      });
    } else {
      Object.defineProperty(process, "domain", {
        get: () => fakeDomain,
        configurable: true,
      });
    }

    try {
      Q.resolve(42).done();
      expect(bindCallCount).toBe(1);
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(process, "domain", originalDescriptor);
      }
    }
  });
});