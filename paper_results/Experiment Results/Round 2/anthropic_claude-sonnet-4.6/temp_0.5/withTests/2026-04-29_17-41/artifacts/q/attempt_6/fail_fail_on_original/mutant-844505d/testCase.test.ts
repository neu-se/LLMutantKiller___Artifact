import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should call process.domain.bind when a domain is active during done()", (testDone) => {
    const d = domain.create();
    let bindCallCount = 0;
    const originalBind = d.bind.bind(d);
    
    // Use Object.defineProperty to avoid TypeScript type issues
    const spy = function<T extends Function>(callback: T): T {
      bindCallCount++;
      return originalBind(callback);
    };
    Object.defineProperty(d, "bind", { value: spy, writable: true, configurable: true });

    d.run(() => {
      // process.domain === d here, so process.domain.bind === d.bind === spy
      Q.reject(new Error("test")).done();
    });

    // The bind call in done() is synchronous, check after run
    expect(bindCallCount).toBeGreaterThan(0);
    testDone();
  });
});