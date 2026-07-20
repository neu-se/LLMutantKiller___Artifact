import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("domain exit behavior", () => {
  it("should exit domain when error occurs in nextTick task", (done) => {
    const domain = require('domain').create();
    let domainActive = true;

    domain.run(() => {
      // Check if we're in the domain
      expect(domain.active).toBe(true);

      Q.nextTick(() => {
        // This should trigger domain.exit() in original code
        throw new Error("test error");
      });

      // After the error, domain should no longer be active in original code
      setTimeout(() => {
        expect(domain.active).toBe(false);
        done();
      }, 50);
    });

    // Catch the error to prevent test failure
    process.on('uncaughtException', () => {});
  });
});