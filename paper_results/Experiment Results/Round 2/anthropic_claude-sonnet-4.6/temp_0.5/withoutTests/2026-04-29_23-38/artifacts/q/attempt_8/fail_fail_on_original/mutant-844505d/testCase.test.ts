import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done domain binding", () => {
  it("calls process.domain.bind on onUnhandledError when process.domain exists", (done) => {
    const bindCalled = { value: false };
    
    // Get the original descriptor so we can restore it
    const originalDescriptor = Object.getOwnPropertyDescriptor(process, "domain");
    
    const fakeDomain = {
      bind: (fn: Function) => {
        bindCalled.value = true;
        return fn;
      }
    };
    
    // Override process.domain with our fake domain
    Object.defineProperty(process, "domain", {
      get: () => fakeDomain,
      configurable: true
    });
    
    // Set onerror to prevent uncaught exception noise
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = () => {};
    
    Q.reject(new Error("test")).done();
    
    setTimeout(() => {
      // Restore process.domain
      if (originalDescriptor) {
        Object.defineProperty(process, "domain", originalDescriptor);
      } else {
        Object.defineProperty(process, "domain", {
          get: () => null,
          configurable: true
        });
      }
      (Q as any).onerror = originalOnerror;
      
      if (bindCalled.value) {
        done();
      } else {
        done(new Error("process.domain.bind was not called - mutation detected"));
      }
    }, 200);
  });
});