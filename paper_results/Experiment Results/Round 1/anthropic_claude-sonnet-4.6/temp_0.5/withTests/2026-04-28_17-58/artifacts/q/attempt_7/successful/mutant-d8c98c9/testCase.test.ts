import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("domain exit after task execution", () => {
  it("process.domain should be null inside a task scheduled outside a domain that runs after a domain task", (done) => {
    const d = domain.create();

    // Schedule domain task first
    d.run(() => {
      Q.nextTick(() => {
        // runs inside domain; domain.exit() should be called after this
      });
    });

    // After the flush completes, schedule a new task outside any domain
    // Use setTimeout to ensure the flush has completed first
    setTimeout(() => {
      Q.nextTick(() => {
        const currentDomain = (process as any).domain;
        if (currentDomain === d) {
          done(new Error("process.domain is still d - domain.exit() was not called"));
        } else {
          done();
        }
      });
    }, 50);
  });
});