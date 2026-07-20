import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("domain exit after task execution", () => {
  it("should call domain.exit() the same number of times as domain.enter() after tasks complete", (done) => {
    const d = domain.create();
    let enterCount = 0;
    let exitCount = 0;

    const originalEnter = d.enter.bind(d);
    const originalExit = d.exit.bind(d);

    d.enter = function () {
      enterCount++;
      return originalEnter();
    };

    d.exit = function () {
      exitCount++;
      return originalExit();
    };

    d.run(() => {
      Q.nextTick(() => {
        // task runs inside domain
      });
    });

    // Check after the flush cycle completes
    d.run(() => {
      Q.nextTick(() => {
        Q.nextTick(() => {
          // By now the first domain task should have completed
          // enter and exit should have been called equal times
          if (enterCount === exitCount && enterCount > 0) {
            done();
          } else {
            done(new Error(`enter called ${enterCount} times, exit called ${exitCount} times - they should be equal`));
          }
        });
      });
    });
  });
});