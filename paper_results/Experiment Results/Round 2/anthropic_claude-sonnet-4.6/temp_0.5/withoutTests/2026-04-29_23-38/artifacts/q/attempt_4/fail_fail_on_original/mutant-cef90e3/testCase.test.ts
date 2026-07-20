import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag prevents double callback invocation", () => {
  it("rejected callback should be called at most once even with multiple notifications", async () => {
    const d = Q.defer();
    let rejectedCallCount = 0;

    const p = d.promise.then(
      null,
      (e: any) => {
        rejectedCallCount++;
        return 42;
      }
    );

    // Notify twice - first notification triggers rejection handler (done=false)
    // Second notification: done=true, original returns early, mutated calls rejected again
    d.notify(1);
    d.notify(2);
    d.resolve(10);

    await p;

    // Original: rejected called once (first notify, done=false)
    // Mutated: rejected called twice (second notify doesn't return early)
    expect(rejectedCallCount).toBe(1);
  });
});