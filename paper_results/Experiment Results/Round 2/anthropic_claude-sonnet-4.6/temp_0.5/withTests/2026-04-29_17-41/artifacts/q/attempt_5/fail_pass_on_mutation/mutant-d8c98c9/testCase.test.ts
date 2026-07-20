import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("should properly restore domain context after task execution so errors go to the right domain", (done) => {
    const d1 = domain.create();
    const d2 = domain.create();
    
    const d1Errors: Error[] = [];
    const d2Errors: Error[] = [];
    
    d1.on("error", (err: Error) => { d1Errors.push(err); });
    d2.on("error", (err: Error) => { d2Errors.push(err); });

    const testError = new Error("test");

    // Schedule a task in d1 first
    d1.run(() => {
      Q.nextTick(() => {
        // task runs in d1, then d1.exit() should be called
      });
    });

    // Schedule a task in d2 second  
    d2.run(() => {
      Q.nextTick(() => {
        // With original: d1.exit() was called, d2.enter() called, error goes to d2
        // With mutation: d1.exit() NOT called, d2.enter() called on top, 
        // but d1 is still "active" - when d2.exit() is called (also missing in mutation),
        // d1 is still entered
        throw testError;
      });
    });

    setTimeout(() => {
      try {
        // The error thrown in d2's task should be caught by d2, not d1
        expect(d2Errors).toContain(testError);
        expect(d1Errors).not.toContain(testError);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});