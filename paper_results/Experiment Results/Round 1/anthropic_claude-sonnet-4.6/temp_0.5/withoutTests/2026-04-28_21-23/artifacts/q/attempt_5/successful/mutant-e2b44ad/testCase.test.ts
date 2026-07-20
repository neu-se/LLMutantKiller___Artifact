import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Promise.prototype.done", () => {
  it("calls process.domain.bind on onUnhandledError when an active domain exists", (done) => {
    const d = domainModule.create();
    let bindCalled = false;

    d.run(() => {
      const currentDomain = (process as any).domain;
      expect(currentDomain).toBeTruthy();

      const originalBind = currentDomain.bind;
      currentDomain.bind = function (fn: Function) {
        bindCalled = true;
        return originalBind.call(currentDomain, fn);
      };

      try {
        Q.resolve(42).done();
      } finally {
        currentDomain.bind = originalBind;
      }

      // Check synchronously since the if-block in done() runs synchronously
      expect(bindCalled).toBe(true);
      done();
    });
  });
});