import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("domain exit behavior", () => {
  it("should exit domain after task execution", (done) => {
    const domain = require('domain').create();
    let exited = false;

    domain.on('domainExit', () => {
      exited = true;
    });

    domain.run(() => {
      Q.nextTick(() => {
        // This should trigger domain.exit() in the original code
      });
    });

    setTimeout(() => {
      expect(exited).toBe(true);
      done();
    }, 100);
  });
});