import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise message queue behavior", () => {
  it("should correctly handle message queue when resolved before handlers are added", (done) => {
    const deferred = defer();
    let firstHandlerCalled = false;
    let secondHandlerCalled = false;

    // Resolve immediately
    deferred.resolve("immediate");

    // Add handlers after resolution
    deferred.promise.then(() => {
      firstHandlerCalled = true;
    });

    deferred.promise.then(() => {
      secondHandlerCalled = true;
    });

    setTimeout(() => {
      // With the mutation (if (true)), messages would be undefined
      // and the handlers added after resolution wouldn't work correctly
      expect(firstHandlerCalled).toBe(true);
      expect(secondHandlerCalled).toBe(true);
      done();
    }, 10);
  });
});