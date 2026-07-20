import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done domain binding", () => {
  it("calls process.domain.bind on onUnhandledError when process.domain exists", (done) => {
    const bindCalled = { value: false };
    
    const originalDomain = (process as any).domain;
    
    // Set up a fake domain with a bind spy
    const fakeDomain = {
      bind: (fn: Function) => {
        bindCalled.value = true;
        // Return the function as-is so behavior continues normally
        return fn;
      }
    };
    
    (process as any).domain = fakeDomain;
    
    // Set onerror to prevent uncaught exception
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = () => {};
    
    try {
      Q.reject(new Error("test")).done();
    } finally {
      // Restore synchronously after done() sets up the handler
      // but we need to wait for nextTick to fire first
    }
    
    setTimeout(() => {
      (process as any).domain = originalDomain;
      (Q as any).onerror = originalOnerror;
      
      if (bindCalled.value) {
        done();
      } else {
        done(new Error("process.domain.bind was not called - mutation detected"));
      }
    }, 200);
  });
});