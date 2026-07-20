const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done() with process.domain", () => {
  it("should correctly evaluate process.domain condition", () => {
    // Test case 1: process exists with domain
    const mockProcessWithDomain = {
      nextTick: (fn: Function) => setTimeout(fn, 0),
      domain: {
        bind: jest.fn((fn) => fn),
        enter: jest.fn(),
        exit: jest.fn()
      },
      toString: () => "[object process]"
    };

    // Test case 2: process exists without domain
    const mockProcessWithoutDomain = {
      nextTick: (fn: Function) => setTimeout(fn, 0),
      toString: () => "[object process]"
    };

    // Test case 3: no process
    const originalProcess = global.process;

    try {
      // Test with process and domain
      global.process = mockProcessWithDomain as any;
      const promise1 = Q.resolve("test1");
      let domainBound1 = false;
      (global.process as any).domain.bind = jest.fn((fn: Function) => {
        domainBound1 = true;
        return fn;
      });
      promise1.done(() => {
        expect(domainBound1).toBe(true);
      });

      // Test with process but no domain
      global.process = mockProcessWithoutDomain as any;
      const promise2 = Q.resolve("test2");
      let domainBound2 = false;
      promise2.done(() => {
        expect(domainBound2).toBe(false);
      });

      // Test without process
      global.process = undefined as any;
      const promise3 = Q.resolve("test3");
      let domainBound3 = false;
      promise3.done(() => {
        expect(domainBound3).toBe(false);
      });
    } finally {
      global.process = originalProcess;
    }
  });
});