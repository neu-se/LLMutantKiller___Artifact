import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should execute onUnhandledError within the domain context when done() is called inside a domain", (done) => {
    const d = domain.create();
    const expectedError = new Error("test domain error");
    let domainInsideHandler: any = "not set";

    (Q as any).onerror = (err: Error) => {
      domainInsideHandler = (process as any).domain;
      if (domainInsideHandler === d) {
        done();
      } else {
        done(new Error(`Expected process.domain to be 'd' inside onerror, but got: ${domainInsideHandler}`));
      }
    };

    d.run(() => {
      Q.reject(expectedError).done();
    });

    setTimeout(() => {
      if (domainInsideHandler === "not set") {
        done(new Error("onerror was never called"));
      }
    }, 300);
  });
});