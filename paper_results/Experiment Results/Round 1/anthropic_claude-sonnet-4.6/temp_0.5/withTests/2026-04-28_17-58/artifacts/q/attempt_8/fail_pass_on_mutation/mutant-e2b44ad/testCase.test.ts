const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
const domain = require("domain");

describe("Promise.prototype.done domain binding", () => {
  it("should bind onUnhandledError to domain so errors thrown in future ticks are caught", (done) => {
    const d = domain.create();
    const expectedError = new Error("test " + Math.random());
    let caughtByDomain = false;

    d.on("error", (err: any) => {
      if (err === expectedError) {
        caughtByDomain = true;
      }
    });

    // Enter domain, call done(), then exit domain before async handlers fire
    d.enter();
    Q.reject(expectedError).done();
    d.exit();

    // At this point process.domain is null, but if binding worked,
    // the error should still be routed to domain d
    setTimeout(() => {
      expect(caughtByDomain).toBe(true);
      done();
    }, 200);
  });
});