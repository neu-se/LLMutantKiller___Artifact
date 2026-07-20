import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainLib from "node:domain";

describe("Q.done domain binding", () => {
  it("errors from done() are caught by active domain rather than becoming uncaught exceptions", (done) => {
    // Create domain AFTER the promise chain is set up
    // so async context tracking won't help
    const rejectedPromise = Q.reject(new Error("test-domain-bind"));
    
    // Now create domain and enter it manually (not via d.run)
    const d = domainLib.create();
    let domainCaughtIt = false;
    
    d.on("error", (err: Error) => {
      if (err.message === "test-domain-bind") {
        domainCaughtIt = true;
        d.exit();
      }
    });
    
    // Enter domain manually - this sets process.domain = d
    // but does NOT set up async context tracking for already-created promises
    d.enter();
    
    // Call done() - original code will bind onUnhandledError to d
    // Mutated code won't bind it
    rejectedPromise.done();
    
    // Exit domain - process.domain is now null
    d.exit();
    
    // When nextTick fires, process.domain is null
    // Original: onUnhandledError was bound to d, so d catches the error
    // Mutated: onUnhandledError not bound, throws with no domain → uncaught
    
    setTimeout(() => {
      if (domainCaughtIt) {
        done();
      } else {
        done(new Error("Domain did not catch error - mutation detected"));
      }
    }, 500);
  });
});