import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as nodeDomain from "domain";

describe("node domain support in done()", () => {
  it("should call process.domain.bind on the unhandled error handler when a domain is active", (testDone) => {
    const d = nodeDomain.create();
    let bindCalled = false;
    const originalBind = d.bind.bind(d);

    // Intercept bind calls on the domain
    const originalBindMethod = d.bind;
    d.bind = function<T extends Function>(fn: T): T {
      bindCalled = true;
      return originalBind(fn) as T;
    };

    (Q as any).onerror = function() {};

    d.run(() => {
      Q.reject(new Error("test")).done();
    });

    // bind() is called synchronously inside done() while process.domain === d
    expect(bindCalled).toBe(true);
    (Q as any).onerror = null;
    testDone();
  });
});