import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done domain binding", () => {
  it("should bind onUnhandledError to process.domain when process.domain exists", (done) => {
    let bindWasCalled = false;

    const fakeDomain = {
      bind: (fn: Function) => {
        bindWasCalled = true;
        return fn;
      },
      enter: () => {},
      exit: () => {},
      run: (fn: Function) => fn(),
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

      // Give async operations time to complete
      setTimeout(() => {
        try {
          (Q as any).onerror = undefined;
          expect(bindWasCalled).toBe(true);
          done();
        } catch (e) {
          done(e);
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
      }, 200);
    } catch (e) {
      // Restore original descriptor on error
      if (originalDescriptor) {
        Object.defineProperty(process, "domain", originalDescriptor);
      } else {
        Object.defineProperty(process, "domain", {
          value: undefined,
          configurable: true,
          writable: true,
        });
      }
      done(e);
    }
  });
});