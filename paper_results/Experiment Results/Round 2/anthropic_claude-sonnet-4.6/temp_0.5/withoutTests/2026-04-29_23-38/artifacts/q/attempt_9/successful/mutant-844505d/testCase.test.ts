import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done domain binding", () => {
  it("calls process.domain.bind on onUnhandledError when process.domain exists", (done) => {
    const bindCalled = { value: false };
    
    const originalDescriptor = Object.getOwnPropertyDescriptor(process, "domain");
    
    const fakeDomain = {
      bind: (fn: Function) => {
        bindCalled.value = true;
        return fn;
      },
      enter: () => {},
      exit: () => {},
      run: (fn: Function) => fn(),
      add: () => {},
      remove: () => {},
      emit: () => false,
      on: () => fakeDomain,
    };
    
    Object.defineProperty(process, "domain", {
      get: () => fakeDomain,
      configurable: true
    });
    
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = () => {};
    
    Q.reject(new Error("test")).done();
    
    setTimeout(() => {
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