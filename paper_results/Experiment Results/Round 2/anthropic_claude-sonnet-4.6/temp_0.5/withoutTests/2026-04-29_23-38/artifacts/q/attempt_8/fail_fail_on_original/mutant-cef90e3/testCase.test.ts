import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag prevents double invocation", () => {
  it("rejected callback should be called exactly once with multiple notifications", (done) => {
    const d = Q.defer();
    let count = 0;

    d.promise.then(
      null,
      (_e: any) => {
        count++;
        return 42;
      }
    );

    // Wait for the then's Q.nextTick task to run (registers FUNC2 in progressListeners)
    Q.nextTick(() => {
      // Now FUNC2 is in progressListeners
      d.notify(1);  // queues FUNC2(1) - done=false, will increment count
      d.notify(2);  // queues FUNC2(2) - done=true after FUNC2(1), original returns early, mutated increments count

      // Wait for notifications to process
      Q.nextTick(() => {
        Q.nextTick(() => {
          try {
            // Original: count = 1 (second notification returns early due to done flag)
            // Mutated: count = 2 (done flag doesn't return, rejected called twice)
            expect(count).toBe(1);
            done();
          } catch (e) {
            done(e as Error);
          }
        });
      });
    });
  });
});