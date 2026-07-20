import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("errors thrown in promise done() handlers are caught by the active domain", (done) => {
    const d = domain.create();
    const caughtErrors: Error[] = [];
    let timeoutId: ReturnType<typeof setTimeout>;
    
    d.on("error", (err: Error) => {
      clearTimeout(timeoutId);
      caughtErrors.push(err);
      try {
        expect(err.message).toBe("domain error");
        done();
      } catch (e) {
        done(e);
      }
    });

    timeoutId = setTimeout(() => {
      // If domain never caught the error, the test should fail
      done(new Error("domain error handler was never called - domain.exit() may not have been called properly"));
    }, 300);

    d.run(() => {
      // When domain.exit() is properly called after each task,
      // the domain remains active for subsequent async callbacks
      // and errors thrown in .done() are routed to the domain
      Q(42).then(() => {
        throw new Error("domain error");
      }).done();
    });
  });
});