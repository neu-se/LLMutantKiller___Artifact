import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("domain exit after task execution", () => {
  it("should call domain.exit() after running a task scheduled within a domain", (done) => {
    const d = domain.create();
    let exitCallCount = 0;
    const originalExit = d.exit.bind(d);

    d.exit = function () {
      exitCallCount++;
      return originalExit();
    };

    d.run(() => {
      Q.nextTick(() => {
        // task runs inside domain; domain.exit() should be called after this
      });
    });

    setTimeout(() => {
      if (exitCallCount > 0) {
        done();
      } else {
        done(new Error("domain.exit() was never called after the task ran inside the domain"));
      }
    }, 200);
  });
});