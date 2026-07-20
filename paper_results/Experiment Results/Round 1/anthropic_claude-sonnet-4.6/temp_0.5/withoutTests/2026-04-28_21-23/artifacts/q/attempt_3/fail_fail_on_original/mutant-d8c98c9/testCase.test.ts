import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Q domain handling", () => {
  it("should exit the domain after task so subsequent tasks outside domain do not inherit it", (done) => {
    const d = domainModule.create();

    // Schedule a task inside the domain
    d.run(() => {
      Q.resolve(42).then(function () {
        return 42;
      });
    });

    // Schedule a task outside the domain AFTER the domain task
    // With domain.exit() called (original): process.domain should NOT be d here
    // Without domain.exit() (mutated): process.domain would still be d
    Q.resolve("check").then(function () {
      // Use (process as any).domain to avoid TS errors
      const activeDomain = (process as any).domain;
      // This task was scheduled outside the domain, so domain should not be d
      expect(activeDomain).not.toBe(d);
      done();
    });
  });
});