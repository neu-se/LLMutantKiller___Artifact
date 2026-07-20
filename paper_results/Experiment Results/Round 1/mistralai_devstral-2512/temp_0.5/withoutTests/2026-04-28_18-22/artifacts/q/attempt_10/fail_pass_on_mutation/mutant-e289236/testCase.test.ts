import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise message queue behavior", () => {
  it("should maintain message queue until resolution", (done) => {
    const deferred = defer();
    let firstHandlerCalled = false;
    let secondHandlerCalled = false;

    // Add first handler
    deferred.promise.then(() => {
      firstHandlerCalled = true;
    });

    // The mutation changes `if (messages)` to `if (true)`
    // which would immediately set messages to undefined
    // This should break the ability to add more handlers after the first one

    // Add second handler
    deferred.promise.then(() => {
      secondHandlerCalled = true;
    });

    // Resolve
    deferred.resolve("test");

    setTimeout(() => {
      // Both handlers should be called in original code
      // In mutated code, second handler might not work properly
      expect(firstHandlerCalled).toBe(true);
      expect(secondHandlerCalled).toBe(true);
      done();
    }, 10);
  });
});