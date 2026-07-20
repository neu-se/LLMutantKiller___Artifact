import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainLib from "node:domain";

describe("Q.done domain binding", () => {
  it("domain catches error thrown by onUnhandledError when bound", (done) => {
    const d = domainLib.create();
    let domainCaughtError = false;
    let uncaughtFired = false;

    d.on("error", (err: Error) => {
      if (err && err.message === "bound-domain-test") {
        domainCaughtError = true;
      }
    });

    // Use a fresh domain that exits before nextTick fires
    // so the async tracking won't help - only explicit bind matters
    const outerDomain = domainLib.create();
    outerDomain.run(() => {
      // Switch to inner domain d, schedule the rejection, then exit d
      // so only explicit bind would keep d as the active domain
      process.domain && (process as any).domain.exit();
      d.enter();
      Q.reject(new Error("bound-domain-test")).done();
      d.exit();
      // Now no domain is active; nextTick fires later with no active domain
      // Original: onUnhandledError bound to d → domain catches it
      // Mutated: not bound → uncaught exception
    });

    setTimeout(() => {
      if (domainCaughtError) {
        done();
      } else {
        done(new Error("Domain did not catch error - binding did not occur (mutation present)"));
      }
    }, 500);
  });
});