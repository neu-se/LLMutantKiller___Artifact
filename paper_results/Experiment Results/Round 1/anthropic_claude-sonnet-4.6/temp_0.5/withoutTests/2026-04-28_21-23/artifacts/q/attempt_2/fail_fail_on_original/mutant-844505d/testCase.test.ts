import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done domain binding", () => {
  it("should bind onUnhandledError to process.domain when process.domain exists", () => {
    let bindWasCalled = false;

    const fakeDomain = {
      bind: (fn: Function) => {
        bindWasCalled = true;
        return fn;
      },
    };

    // Override process.domain using defineProperty since it's a getter
    const originalDescriptor = Object.getOwnPropertyDescriptor(process, "domain");
    Object.defineProperty(process, "domain", {
      get: () => fakeDomain,
      configurable: true,
    });

    try {
      // Suppress unhandled error by setting onerror
      (Q as any).onerror = () => {};

      Q.reject(new Error("test")).done();

      (Q as any).onerror = undefined;

      expect(bindWasCalled).toBe(true);
    } finally {
      // Restore original descriptor
      if (originalDescriptor) {
        Object.defineProperty(process, "domain", originalDescriptor);
      } else {
        Object.defineProperty(process, "domain", {
          value: undefined,
          configurable: true,
          writable: true,
        });
      }
    }
  });
});