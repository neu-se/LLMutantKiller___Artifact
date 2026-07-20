import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain binding", () => {
  it("should call process.domain.bind on the error handler when a domain is active", (done) => {
    const d = domain.create();
    let bindWasCalled = false;
    const originalBind = d.bind.bind(d);

    // Spy on domain.bind to detect if it gets called
    d.bind = function(fn: Function) {
      bindWasCalled = true;
      return originalBind(fn);
    };

    d.run(() => {
      Q.reject(new Error("test")).done();
    });

    // Give it a tick to process
    setTimeout(() => {
      d.exit();
      expect(bindWasCalled).toBe(true);
      done();
    }, 50);
  });
});