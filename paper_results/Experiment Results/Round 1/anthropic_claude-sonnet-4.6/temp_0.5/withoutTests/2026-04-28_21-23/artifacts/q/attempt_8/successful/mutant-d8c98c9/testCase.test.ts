import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainModule from "domain";

describe("Q domain handling", () => {
  it("should call domain.exit() the same number of times as domain.enter()", async () => {
    const d = domainModule.create();
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

    await new Promise<void>((resolve) => {
      d.run(() => {
        Q.nextTick(function () {
          // task body
        });
      });

      // Wait for flush to complete
      setTimeout(resolve, 50);
    });

    // domain.enter() should be called once, and domain.exit() should match
    expect(enterCount).toBeGreaterThan(0);
    // Original: exit called same number of times as enter
    // Mutated: exit never called, so exitCount = 0
    expect(exitCount).toBe(enterCount);
  });
});